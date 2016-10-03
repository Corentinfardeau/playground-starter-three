/**********************************************************************

Terrain

**********************************************************************/

import { 
	PlaneGeometry,
	MeshLambertMaterial,
	Mesh,
	DoubleSide
} from "three";
import _ from 'underscore';

export default class Terrain extends PlaneGeometry {

	constructor(width, height, widthSegments, heightSegments){
		super();
		let planeGeometry = new PlaneGeometry(width, height, widthSegments, heightSegments);
		let material = new MeshLambertMaterial( {color: 0xffbdec, side: DoubleSide} );
		this.plane = new Mesh( planeGeometry, material );
		this.plane.rotation.x = Math.PI*0.5;
		this.plane.receiveShadow = true;

		return this.plane;
	}
	
}