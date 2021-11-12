import React, { useState, useEffect } from "react";
import Loading from "./components/Loading.jsx";
import Tours from "./components/Tours.jsx";

const url = "https://course-api.com/react-tours-project";
function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTour] = useState([]);

  const removeTour = (id) => {
   const newtours=tours.filter((tour) => tour.id != id)
    setTour(newtours);
  };
  const fetchTours = () => {
    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setLoading(false);
        setTour(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchTours();
  }, []);
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if(tours.length==0){
    return <main>
      <div className="title">
        <h2>No tours left</h2>
        <button className="btn" onClick={fetchTours}>Refresh</button>
      </div>
    </main>
  }
  return (
    <main>
      <Tours tour={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
