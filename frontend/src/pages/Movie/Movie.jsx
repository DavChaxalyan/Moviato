import React from 'react'
import {useParams} from "react-router-dom"
import MovieBanner from '../../components/MovieBanner'
import CastCrew from '../../components/CastCrew'
import AboutMovie from '../../components/AboutMovie'
import RelatedMoviesandSerials from '../../components/RelatedMoviesandSerials/RelatedMoviesandSerials'
import CommentSection from "../../components/CommentSection/CommentSection"

const Movie = () => {
  const {id} =  useParams()
  return (
    <section>
        <MovieBanner id={id}/>

        <CastCrew id={id}/>
        <AboutMovie id={id}/>
        <RelatedMoviesandSerials id={id}/>
        <CommentSection id={id}/>
    </section>
  )
}

export default Movie

// import { useParams } from "react-router-dom";
// import { ActorsMovie } from "../../components/ActorsMovie";
// import { MoviePageTitle } from "../../components/MoviePageTitle";
// import { Comments } from "../../components/Comments";
// import { SimilarForm } from "../../components/SimilarForm/SimilarForm";
// import { Trailer } from "../../components/Trailer";
// const Movie = () => {
//   const { id } = useParams();
//   return (
//     <div>
//       <MoviePageTitle id={id} type="movie" />
//       <Trailer id={id} type="movie" />
//       <div className="main-container">
//         <ActorsMovie title={"Cast & Crew"} id={id} />
//         <SimilarForm id={id} type="movie" category="similar" title="Similar Movies" />
//         <Comments id={id} type="movie" />
//         {/* <SimilarForm id={id} type="movie" category="recommendations" title="Recommendations" /> */}
//       </div>
//     </div>
//   );
// };

// export default Movie;

