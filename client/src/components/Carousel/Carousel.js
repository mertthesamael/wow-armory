import {Swiper, SwiperSlide} from "swiper/react";
import { Controller, EffectCoverflow, FreeMode, Grid, Keyboard, Manipulation, Mousewheel, Navigation, Pagination, Parallax, Virtual } from "swiper";
import "./carousel.scss"


const Carousel = (props) => {
console.log(props.data)
    const params = {
        modules:[Navigation, EffectCoverflow, Pagination, Keyboard],
        effect: "coverflow",
        loop: true,
        pagination:true,
        grabCursor: true,
        spaceBetween: 100,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 20,
          stretch: 10,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        },
        navigation:true,
          keyboard: {
            enabled: true,
          },
         
      }

      return (
        <>
        <Swiper {...params} >
            {props?.data.map(item =>
          <SwiperSlide>

 <div class="card">
 <div class="card__image">
   <img alt="card image"/>
 </div>

 <div class="card__content">
   <span class="card__title">{item.name}</span>
   <span class="card__name"></span>
   <p class="card__text">
   </p>
  
 </div>
</div>
            </SwiperSlide>
            
            )}
        </Swiper>
            </>
      )


}

export default Carousel