import React from 'react';
import './Gradient.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
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

            <div className='carousel-container container'>
                <Carousel showArrows={true} onSwipeMove={true}>
                    <div className='image-container'>
                        <div className='img-carousel img-1' />

                    </div>
                    <div className='image-container'>
                        <div className='img-carousel img-2' />

                    </div>
                    <div className='image-container '>
                        <div className='img-carousel img-3' />

                    </div>
                </Carousel>

            </div>

            <div className='text-animation-1 container'>
                <div id='container'>
                    Make
                    <div id="flip">
                        <div><div>wOrK</div></div>
                        <div><div>lifeStyle</div></div>
                        <div><div>Everything</div></div>
                    </div>
                    AweSoMe!
                </div>

            </div>

            <div className='text-animation-2 container'>
                <div class="container-1">
                    <div class="box">

                        <div class="title">
                            <span class="block"></span>
                            <h1>Obisidian<span></span></h1>
                        </div>

                        <div class="role">
                            <div class="block"></div>
                            <p>UI Dev designer</p>
                        </div>

                    </div>
                </div>


            </div>



        </>
    );
}

export default Gradient;