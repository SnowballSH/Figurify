package tttt

import (
	"encoding/json"
	"fmt"
	"math"
	"net/http"
	"time"

	mm "github.com/SnowballSH/gominimax"
)

const G = 0

type TictactoeBoard4 struct {
	state [16]int
}

func (board *TictactoeBoard4) IsEmpty(index int) bool {
	return board.state[index] == G
}

func (board *TictactoeBoard4) IsFull() bool {
	for index := 0; index < len(board.state); index++ {
		if board.state[index] == G {
			return false
		}
	}
	return true
}

func (board *TictactoeBoard4) OpenPositions() (positions []int) {
	for index, val := range board.state {
		if val == G {
			positions = append(positions, index)
		}
	}
	return
}

func (board *TictactoeBoard4) SetMark(mark int, index int) {
	board.state[index] = mark
}

func winningCombinations4() [10][4]int {
	return [10][4]int{
		{0, 1, 2, 3}, {4, 5, 6, 7}, {8, 9, 10, 11}, {12, 13, 14, 15},
		{0, 4, 8, 12}, {1, 5, 9, 13}, {2, 6, 10, 14}, {3, 7, 11, 15},
		{0, 5, 10, 15}, {3, 6, 9, 12},
	}
}

func (board *TictactoeBoard4) Winner() (winner interface{}) {
	winner = nil
	for _, combination := range winningCombinations4() {
		if board.state[combination[0]] == G {
			continue
		}
		if board.state[combination[0]] == board.state[combination[1]] &&
			board.state[combination[0]] == board.state[combination[2]] &&
			board.state[combination[0]] == board.state[combination[3]] {
			winner = board.state[combination[0]]
			break
		}
	}
	return winner
}

func (board *TictactoeBoard4) analyze(rich bool) float64 {
	score := 0.0

	if rich {
		if board.state[0] == 1 {
			score += 2
		} else if board.state[0] == 2 {
			score -= 2
		}
		if board.state[3] == 1 {
			score += 2
		} else if board.state[3] == 2 {
			score -= 2
		}
		if board.state[12] == 1 {
			score += 2
		} else if board.state[12] == 2 {
			score -= 2
		}

		if board.state[15] == 1 {
			score += 2
		} else if board.state[15] == 2 {
			score -= 2
		}
	}

	if winner := board.Winner(); winner == 1 {
		score = 1000
	} else if winner == 2 {
		score = -1000
	} else if board.IsFull() {
		score = 0
	}

	return score
}

func iterate4(board *TictactoeBoard4, node *mm.Node, player int, rich bool) {
	if board.IsFull() || board.Winner() != nil {
		res := board.analyze(rich)
		node.Value = &res
		node.Eval = func() float64 {
			return res
		}
		return
	}

	for _, w := range board.OpenPositions() {
		b := &TictactoeBoard4{state: board.state}
		b.SetMark(player, w)

		n := &mm.Node{
			Eval: func() float64 {
				return board.analyze(rich)
			},
			Info: w,
		}
		iterate4(b, n, player^3, rich)
		node.Children = append(node.Children, n)
	}
}

func TTTT(w http.ResponseWriter, r *http.Request) {
	var resp struct {
		Board  [16]int
		Player int
		Depth  int
		Rich   bool
	}

	start := time.Now()

	switch r.Method {
	case http.MethodPost:
		if err := r.ParseForm(); err != nil {
			http.Error(w, "Invalid POST data (No form)", http.StatusBadRequest)
			return
		}

		d := json.NewDecoder(r.Body)

		err := d.Decode(&resp)

		if err != nil {
			http.Error(w, "Invalid POST data (Invalid board)\n"+err.Error(), http.StatusBadRequest)
			return
		}

		board := &TictactoeBoard4{
			state: resp.Board,
		}

		node := &mm.Node{
			Eval: func() float64 {
				return board.analyze(resp.Rich)
			},
		}
		iterate4(board, node, resp.Player, resp.Rich)

		depth := resp.Depth

		node.Minimax(int8(resp.Player-1), depth, math.Inf(-1), math.Inf(1))

		type ResultT struct {
			Move     interface{}
			Score    float64
			Children []*ResultT
		}

		var result *ResultT

		var iterPut func(n *mm.Node) *ResultT

		iterPut = func(n *mm.Node) *ResultT {
			if n.Value == nil {
				return nil
			}

			var x []*ResultT

			for _, it := range n.Children {
				res := iterPut(it)
				if res != nil {
					x = append(x, res)
				}
			}

			return &ResultT{
				Move:     n.Info,
				Score:    *n.Value,
				Children: x,
			}
		}

		result = iterPut(node)

		marshalled, e := json.Marshal(result)
		if e != nil {
			http.Error(w, "Internal Server Error "+e.Error(), http.StatusInternalServerError)
			return
		}

		_, _ = w.Write(marshalled)

	default:
		http.Error(w, "Cannot "+r.Method, http.StatusMethodNotAllowed)
		return
	}

	duration := time.Since(start)

	fmt.Println(duration)
}
