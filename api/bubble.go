package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

func Bubble(w http.ResponseWriter, r *http.Request) {

	type item struct {
		Value int
		Key   int
		Color string
	}

	type step struct {
		List []*item
		Why  string
	}

	var resp struct {
		Array []int
	}

	start := time.Now()

	switch r.Method {
	case http.MethodPost:
		if err := r.ParseForm(); err != nil {
			http.Error(w, "Invalid POST data (No form)", http.StatusBadRequest)
			return
		}

		var requestedArray []*item

		d := json.NewDecoder(r.Body)

		err := d.Decode(&resp)

		if err != nil {
			http.Error(w, "Invalid POST data (Invalid array)\n"+err.Error(), http.StatusBadRequest)
			return
		}

		for i, x := range resp.Array {
			requestedArray = append(requestedArray, &item{
				Value: x,
				Key:   i,
				Color: "#fce8d8",
			})
		}

		var copyItems = func() (res []*item) {
			for _, x := range requestedArray {
				res = append(res, &item{
					Value: x.Value,
					Key:   x.Key,
					Color: x.Color,
				})
			}
			return res
		}

		swapped := true

		var result []*step

		k := copyItems()
		result = append(result, &step{
			List: k,
			Why:  "Starting Position",
		})

		for j := 0; swapped; j++ {
			swapped = false
			for i := 1; i < len(requestedArray); i++ {
				if requestedArray[i-1].Value > requestedArray[i].Value {
					requestedArray[i-1], requestedArray[i] = requestedArray[i], requestedArray[i-1]
					k := copyItems()
					k[i-1].Color = "#c0deff"
					k[i].Color = "#c0deff"
					result = append(result, &step{
						List: k,
						Why:  fmt.Sprintf("%d < %d, flip!", requestedArray[i-1].Value, requestedArray[i].Value),
					})
					swapped = true
				} else {
					k := copyItems()
					k[i-1].Color = "#c0deff"
					k[i].Color = "#c0deff"
					result = append(result, &step{
						List: k,
						Why:  fmt.Sprintf("%d >= %d, ignore.", requestedArray[i].Value, requestedArray[i-1].Value),
					})
				}
			}
			k := copyItems()
			result = append(result, &step{
				List: k,
				Why:  fmt.Sprintf("Iteration #%d over!", j+1),
			})
		}

		k = copyItems()
		result = append(result, &step{
			List: k,
			Why:  fmt.Sprintf("Nothing swapped, which means the array is sorted!"),
		})

		k = copyItems()
		result = append(result, &step{
			List: k,
			Why:  "Done!",
		})

		//fmt.Println(result)

		marshalled, e := json.Marshal(result)
		if e != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
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
