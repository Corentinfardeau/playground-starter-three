/**********************************************************************

Camera

**********************************************************************/

import { PerspectiveCamera } from "three";
import _ from 'underscore';

export default class Camera extends PerspectiveCamera {

	constructor(opts){
		super(opts.angle, opts.aspect, opts.near, opts.far);
	}

	onResize(width, height){
		this.aspect = width/height;
	}

}