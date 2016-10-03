/**********************************************************************

Cube

**********************************************************************/

import { 
	Object3D,
	BoxGeometry,
	MeshLambertMaterial,
	Mesh
 } from "three";

export default class Cube extends Object3D {

	constructor(size){
		super();
		this.material = new MeshLambertMaterial({
      		wireframe: false
    	});
		this.geom = new BoxGeometry(size, size, size);
    	this.mesh = new Mesh(this.geom, this.material);

		this.mesh.castShadow = true;
		this.mesh.receiveShadow = false;

    	return this.mesh;
	}

	destroy(){

	}

}