import React, { useEffect, useState } from 'react';
import "./style.css";
import user_image from "./user_image.png";
import SvgIcon from '../SvgIcon/SvgIcon';
import { API_KEY, BASE_URL, IMAGE_BASE_URL, POSTER_SIZE_500 } from '../../config/config';

const CommentSection = ({ id }) => {
    const [reviews, setReviews] = useState(null);

    const getMovieTvDate = async () => {
        try {
          const response = await fetch(`${BASE_URL}movie/${id}/reviews?api_key=${API_KEY}`);
          const  { results }  = await response.json();
          setReviews(results);
        } catch (error) {
          console.log("error :", error);
        }
      };
    
      useEffect(() => {
        if (id) {
           getMovieTvDate();
        }
      }, [id]);

      function generateRandomNumber() {
        return Math.floor(Math.random() * (80 - 20 + 1)) + 20;
    }
  return (
    <>
    <div className='comment-section-main main-container'>
        <div className='comment-section-title-div'>
            <div className='comment-section-title'>
                <p>Comment Section</p>
            </div>
            <div className='comment-section-title-a'>
                <a href="#">SEE ALL</a>
            </div>
        </div>
        <div className='comments-div'>
            {
                reviews &&
                reviews.slice(0, 6).map((elm, ind) => {
                    return <div className='comment' key={ind}>
                        <div className='author-comment'>
                            <div className='author-comment-img-div'>
                                <img src={elm.author_details.avatar_path != null ? `${IMAGE_BASE_URL}${POSTER_SIZE_500}${ elm.author_details.avatar_path }`: user_image} alt="" />
                            </div>
                            <div className='comment-author-name-div'>
                                <p style={{fontSize: "16px"}}>{elm.author}</p>
                                <p className='comment-author-date'>{elm.updated_at.split("T")[0]}</p>
                            </div>
                        </div>
                    <div className='main-comment-div'>
                        <p>{elm.content.length > 350 ? `${elm.content.slice(1, 350)}...` : elm.content}</p>
                    </div>
                    <div className='div-line'>
                        <div className='div-comment-commentIcon'>
                            <SvgIcon iconName={"icon_message"} className='icon_message' />
                        </div>
                        <div className='div-comment-likeIcon'>
                            <div className='div-comment-like'>
                                <SvgIcon iconName={"icon_like"} className='icon_like'/>
                                <p>{generateRandomNumber()}</p>
                            </div>
                            <div className='div-comment-dislike'>
                                <SvgIcon iconName={"icon_dislike"} className='icon_dislike'/>
                            </div>
                        </div>
                    </div>
                </div>
              })
            }
        </div>
    </div>
        <div className='div-button-write-comment main-container'>
            <button className='button-write-comment'>Write a comment</button>
        </div>
            </>
  )
}

export default CommentSection