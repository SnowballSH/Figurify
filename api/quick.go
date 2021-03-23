package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

func Quick(w http.ResponseWriter, r *http.Request) {

	type item struct {
		Value int
		Key   int
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
			})
		}

		var result []*step
		length := len(requestedArray)

		k := make([]*item, length)
		copy(k, requestedArray)
		result = append(result, &step{
			List: k,
			Why:  "Starting Position",
		})

		var quicksort func(a []*item) []*item

		quicksort = func(a []*item) []*item {
			var intA []int
			for _, y := range a {
				intA = append(intA, y.Value)
			}

			if len(a) < 2 {
				/*
					if len(a) == 1 {
						k := make([]*item, length)
						copy(k, requestedArray)
						result = append(result, &step{
							List: k,
							Why: fmt.Sprintf("Array %d contains only 1 element, therefore, no need to sort!", intA),
						})
					}
				*/
				return a
			}

			pi := a[0]

			lastIndex := 1

			k := make([]*item, length)
			copy(k, requestedArray)
			result = append(result, &step{
				List: k,
				Why:  fmt.Sprintf("Sorting array %d", intA),
			})

			for i := 1; i < len(a); i++ {
				it := a[i]
				if it.Value < pi.Value {
					a[lastIndex], a[i] = a[i], a[lastIndex]

					if i != lastIndex {
						k := make([]*item, length)
						copy(k, requestedArray)
						result = append(result, &step{
							List: k,
							Why: fmt.Sprintf("%d < pivot(%d), swap it to lastIndex(%d)th position.",
								it.Value, pi.Value, lastIndex),
						})
					} else {
						k := make([]*item, length)
						copy(k, requestedArray)
						result = append(result, &step{
							List: k,
							Why: fmt.Sprintf("%d < pivot(%d), but no need to swap.",
								it.Value, pi.Value),
						})
					}

					lastIndex++
				}
			}

			a[lastIndex-1], a[0] = a[0], a[lastIndex-1]

			if lastIndex-1 != 0 {
				k = make([]*item, length)
				copy(k, requestedArray)
				result = append(result, &step{
					List: k,
					Why: fmt.Sprintf("Swap the first element with the lastIndex-1(%d)th element. Array %d processed!",
						lastIndex-1, intA),
				})
			} else {
				k = make([]*item, length)
				copy(k, requestedArray)
				result = append(result, &step{
					List: k,
					Why:  fmt.Sprintf("No changes made. Array %d processed!", intA),
				})
			}

			quicksort(a[:lastIndex])
			quicksort(a[lastIndex:])

			return a
		}

		quicksort(requestedArray)

		k = make([]*item, length)
		copy(k, requestedArray)
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
