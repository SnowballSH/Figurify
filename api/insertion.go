package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

func Insertion(w http.ResponseWriter, r *http.Request) {

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

		var result []*step

		k := copyItems()
		result = append(result, &step{
			List: k,
			Why:  "Starting Position",
		})

		for i := 1; i < len(requestedArray); i++ {
			key := requestedArray[i]
			j := i - 1

			for j >= 0 && j < len(requestedArray) && requestedArray[j].Value > key.Value {
				requestedArray[j+1] = requestedArray[j]
				j -= 1
			}

			ww := requestedArray[j+1]
			requestedArray[j+1] = key

			k := copyItems()
			k[i].Color = "#c0deff"
			k[j+1].Color = "#c0deff"
			if i != j+1 {
				result = append(result, &step{
					List: k,
					Why: fmt.Sprintf("%d < %d, insert %d before %d!",
						key.Value, ww.Value,
						key.Value, ww.Value),
				})
			} else {
				result = append(result, &step{
					List: k,
					Why: fmt.Sprintf("%d is already the largest, ignore it.",
						key.Value),
				})
			}
		}

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
