import React from 'react';
import './Gradient.scss'
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
        </>
    );
}

export default Gradient;