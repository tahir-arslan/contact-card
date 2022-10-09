// import modules
import  "./form";
import "./submit";
// import css bootsrap poppers
import { Tooltip, Toast, Popover } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/index.css";
// import images
import Logo from '../images/logo.png';
import Bear from '../images/bear.png';
import Dog from '../images/dog.png';


// import _ from 'lodash';

// function component() {
// 	const element = document.createElement('div');

// 	// Lodash, currently included via a script, is required for this line to work
// 	// Lodash, now imported by this script
// 	element.innerHTML = _.join(['Hello', 'webpack'], ' ');

// 	return element;
// }

// use DOM manipulation to insert images into page on load
window.addEventListener('load', function () {
    document.getElementById('logo').src = Logo;
    document.getElementById('bearThumbnail').src = Bear;
    document.getElementById('dogThumbnail').src = Dog;
});

// document.body.appendChild(component());