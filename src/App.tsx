import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux"
import './App.css';
import { fetchGifs, selectGifs } from './feautures/gifs/gifSlice';
import { AppDispatch } from './store';
import { useInView } from 'react-intersection-observer';
import Loader from './Loader';

const App: React.FC = () => {
const [query, setQuery] = useState('');
const [loading, setLoading] = useState(false);
const dispatch = useDispatch<AppDispatch>();
const {gifs, hasMore, offset} = useSelector(selectGifs)
const [hasFetchedInitialData, setHasFetchedInitialData] = useState(false);
const { ref, inView } = useInView({ threshold: 0.5 });
  
useEffect(() => {
  if (query && !hasFetchedInitialData) {
    setLoading(true);
    dispatch(fetchGifs({query, offset:0, reset: true})).finally(() => 
      setLoading(false));
    setHasFetchedInitialData(true)
  }
},[query, dispatch, hasFetchedInitialData,offset])

useEffect(() => {
  if (inView && hasMore && !loading) {
    setLoading(true);
    dispatch(fetchGifs({query, offset, reset: false})).finally(() => 
    setLoading(false))
  }
}, [inView, hasMore, dispatch, query, offset, loading])

const searchGifs = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setQuery((event.target as any).elements.search.value);
  setHasFetchedInitialData(false)
};

return (
  <div className="App">
    <h1>Giphy Search</h1>
    <form onSubmit={searchGifs}>
      <input type="text" name="search" placeholder="Search GIF's"/>
      <button type="submit">Search</button>
    </form>
    <div className="gif-grid">
        {gifs.map((gif, index) => {
          if (index === gifs.length - 1) {
            return (
              <img
                key={gif.id}
                src={gif.images.fixed_height.url}
                alt={gif.title}
                ref={ref}
              />
            );
          } else {
            return (
              <img
                key={gif.id}
                src={gif.images.fixed_height.url}
                alt={gif.title}
              />
            );
          }
        })}
      </div>
      {loading && <Loader />}
  </div>
)
}

export default App