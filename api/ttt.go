package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	mm "github.com/SnowballSH/gominimax"
)

const E = 0

type TictactoeBoard struct {
	state [9]int
}

func (board *TictactoeBoard) IsEmpty(index int) bool {
	return board.state[index] == E
}

func (board *TictactoeBoard) IsFull() bool {
	for index := 0; index < len(board.state); index++ {
		if board.state[index] == E {
			return false
		}
	}
	return true
}

func (board *TictactoeBoard) OpenPositions() (positions []int) {
	for index, val := range board.state {
		if val == E {
			positions = append(positions, index)
		}
	}
	return
}

func (board *TictactoeBoard) SetMark(mark int, index int) {
	board.state[index] = mark
}

func winningCombinations() [8][3]int {
	return [8][3]int{
		{0, 1, 2}, {3, 4, 5}, {6, 7, 8},
		{0, 3, 6}, {1, 4, 7}, {2, 5, 8},
		{0, 4, 8}, {2, 4, 6},
	}
}

func (board *TictactoeBoard) Winner() (winner interface{}) {
	winner = nil
	for _, combination := range winningCombinations() {
		if board.state[combination[0]] == E {
			continue
		}
		if board.state[combination[0]] == board.state[combination[1]] &&
			board.state[combination[0]] == board.state[combination[2]] {
			winner = board.state[combination[0]]
			break
		}
	}
	return winner
}

func (board *TictactoeBoard) analyze() float64 {
	score := 0.0

	if winner := board.Winner(); winner == 1 {
		score += 100
	} else if winner == 2 {
		score -= 100
	}

	if board.state[4] == 1 {
		score += 10
	} else if board.state[4] == 2 {
		score -= 10
	}

	if board.state[0] == 1 {
		score += 2
	} else if board.state[0] == 2 {
		score -= 2
	}
	if board.state[2] == 1 {
		score += 2
	} else if board.state[2] == 2 {
		score -= 2
	}
	if board.state[6] == 1 {
		score += 2
	} else if board.state[6] == 2 {
		score -= 2
	}

	if board.state[8] == 1 {
		score += 2
	} else if board.state[8] == 2 {
		score -= 2
	}

	return score
}

func iterate(board *TictactoeBoard, node *mm.Node, player int) {
	if board.IsFull() {
		res := board.analyze()
		node.Value = &res
		return
	}

	for _, w := range board.OpenPositions() {
		b := &TictactoeBoard{state: board.state}
		b.SetMark(player, w)

		n := &mm.Node{
			Eval: func() float64 {
				return board.analyze()
			},
			Info: w,
		}
		iterate(b, n, player^3)
		node.Children = append(node.Children, n)
	}
}

func TTT(w http.ResponseWriter, r *http.Request) {
	var resp struct {
		Board  [9]int
		Player int
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

		board := &TictactoeBoard{
			state: resp.Board,
		}

		node := &mm.Node{
			Eval: func() float64 {
				return board.analyze()
			},
		}
		iterate(board, node, resp.Player)

		node.FriendlyMinimax(3)

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

		fmt.Println(*result)

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
