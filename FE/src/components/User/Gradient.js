import React from 'react';
import './Gradient.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css'
import LazyLoad from 'react-lazyload';


function Gradient(props) {
    return (
        <>
            <div className='gradient-container'>
                <div class="cube"></div>
                <div class="Container">
                    <div class="board">
                        <div id="color1" class="colorpicker"></div>
                        <div class="content">#DFFF00<br></br>
                            223, 255, 0</div>
                    </div>

                    <div class="board">
                        <div id="color2" class="colorpicker"></div>
                        <div class="content">#6495ED<br></br>
                            100, 149, 237</div>
                    </div>

                    <div class="board">
                        <div id="color3" class="colorpicker"></div>
                        <div class="content">#FFBF00<br></br>
                            255, 191, 0</div>
                    </div>

                    <div class="board">
                        <div id="color4" class="colorpicker"></div>
                        <div class="content">#DE3163<br></br>
                            222, 49, 99</div>
                    </div>

                    <div class="board">
                        <div id="color5" class="colorpicker"></div>
                        <div class="content">#DE3163<br></br>
                            222, 49, 99</div>
                    </div>

                    <div class="board">
                        <div id="color6" class="colorpicker"></div>
                        <div class="content">#DE3163<br></br>
                            222, 49, 99</div>
                    </div>

                    <div class="board">
                        <div id="color7" class="colorpicker"></div>
                        <div class="content">#DE3163<br></br>
                            222, 49, 99</div>
                    </div>

                    <div class="board">
                        <div id="color8" class="colorpicker"></div>
                        <div class="content">#DE3163<br></br>
                            222, 49, 99</div>
                    </div>

                </div>
            </div>

            {/* <div className='carousel-container container'>
                <Swiper
                >
                    <SwiperSlide>Slide 1</SwiperSlide>
                    <SwiperSlide>Slide 2</SwiperSlide>
                    <SwiperSlide>Slide 3</SwiperSlide>
                    <SwiperSlide>Slide 4</SwiperSlide>
                    <SwiperSlide>Slide 5</SwiperSlide>
                    <SwiperSlide>Slide 6</SwiperSlide>
                    <SwiperSlide>Slide 7</SwiperSlide>
                    <SwiperSlide>Slide 8</SwiperSlide>
                    <SwiperSlide>Slide 9</SwiperSlide>
                </Swiper>

            </div> */}

            {/* <div className='text-animation-1 container'>
                <div id='container'>
                    Make
                    <div id="flip">
                        <div><div>wOrK</div></div>
                        <div><div>lifeStyle</div></div>
                        <div><div>Everything</div></div>
                    </div>
                    AweSoMe!
                </div>

            </div> */}

            <div className='text-animation-2 '>
                <LazyLoad height={200}>
                    <div class="container-1">
                        <div class="box">

                            <div class="title">
                                <span class="block"></span>
                                <h1>Obisidian<span></span></h1>
                            </div>

                            <div class="role">
                                <div class="block"></div>
                                <p>Full-snack Dev</p>
                            </div>

                        </div>
                    </div>

                </LazyLoad>
            </div>


            <div className='text-animation-3 '>
                <LazyLoad height={200}>
                    <div id="app">
                        <div class="title">
                            <div class="title-inner">
                                <div class="cafe">
                                    <div class="cafe-inner">Why should</div>
                                </div>
                                <div class="mozart">
                                    <div class="mozart-inner">trust me?</div>
                                </div>
                            </div>
                        </div>

                        <div class="image">
                            <img src='https://images.unsplash.com/photo-1616362355051-6a9f8c434fff?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzE0MTYzNQ&ixlib=rb-1.2.1&q=80&w=800&h=600' alt=''></img>
                            {/* <img src="https://i.pinimg.com/736x/61/2d/f0/612df04143225ded8a94b8a365880687.jpg"></img> */}
                        </div>
                    </div>

                    {/* <a href="https://youtu.be/mBY62jtbMYM" target="_blank" data-keyframers-credit style="color: #000"></a> */}
                    <script src="https://codepen.io/shshaw/pen/QmZYMG.js"></script>
                </LazyLoad>
            </div>

            <div className='text-animation-4 container'>
                <LazyLoad height={200}>
                    <section class="rotatingText">
                        <div class="rotatingText-content">
                            <p class="rotatingText-description">
                                I'll make your website&hellip;
                            </p>

                            <h2 class="rotatingText-adjective">beautiful</h2>
                            <h2 class="rotatingText-adjective">maintainable</h2>
                            <h2 class="rotatingText-adjective">perfect 👌</h2>
                        </div>
                    </section>

                </LazyLoad>
            </div>



        </>
    );
}

export default Gradient;