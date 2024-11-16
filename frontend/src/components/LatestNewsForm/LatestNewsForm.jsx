// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import account from './playIcon.svg'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Pagination, Navigation } from 'swiper/modules';

import img from './img.png';
import img2 from './img2.png';
import './styles.css';
import SvgIcon from '../SvgIcon/SvgIcon';

let BlogForm = () => {
  return (
    <>
      <section className='BlogFormItem'>
        <p style={{color: "#f5f5f5", fontSize: 'var(--m-size)', fontFamily: 'var(--font-family)'}}>Blog</p>
        <div className='BlogFormText'>
          <p>Latest News </p>
        </div>
        {/* <div className='ItemSlideShadowLeft'></div>
        <div className='ItemSlideShadowRight'></div> */}
        <Swiper
          navigation={true}
          slidesPerView={'auto'}
          spaceBetween={30}
          modules={[Pagination, Navigation]}
          className="my-Swiper"
        >
          <SwiperSlide>
            <div className='ImgDiv'>
              <img src={img2} />
              <div className='PlayVideoItem'>
                <img src={account} />
              </div>
            </div>
            <p className='ImgDivText'>Denis Villeneuve Interview | 'Dune: Part Two, Completing The Trilogy, & More</p>
            <span>45:30</span>
          </SwiperSlide>
          <SwiperSlide>

            <div className='ImgDiv'>
              <img src={img} />
              <div className='PlayVideoItem'>
                <img src={account} />
              </div>
            </div>
            <p className='ImgDivText'>THE FALLOUT (2022) | Behind the Scenes of Jenna Ortega Teen Drama Movie</p>
            <span>45:30</span>
          </SwiperSlide>
          <SwiperSlide>
            <div className='ImgDiv'>
              <img src={img2} />
              <div className='PlayVideoItem'>
                {/* <SvgIcon iconName='icon_playCircular' width='60px' height='60px'/> */}
                <img src={account} />
              </div>
            </div>
            <p className='ImgDivText'>Denis Villeneuve Interview | 'Dune: Part Two, Completing The Trilogy, & More</p>
            <span>45:30</span>
          </SwiperSlide>
        </Swiper>
      </section>
    </>
  );
};

export default BlogForm;