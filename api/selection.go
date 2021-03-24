package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

func Selection(w http.ResponseWriter, r *http.Request) {
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

		for i := 0; i < len(requestedArray)-1; i++ {
			min := i
			for j := i + 1; j < len(requestedArray); j++ {
				if requestedArray[j].Value < requestedArray[min].Value {
					min = j
				}
			}

			requestedArray[i], requestedArray[min] = requestedArray[min], requestedArray[i]
			k := copyItems()
			k[min].Color = "#c0deff"
			k[i].Color = "#c0deff"
			for j, x := range k {
				if j < i {
					x.Color = "#dfffc0"
				}
			}
			if i != min {
				result = append(result, &step{
					List: k,
					Why:  fmt.Sprintf("%d is the smallest, swap it to the front!", requestedArray[i].Value),
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
