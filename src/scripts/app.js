/**********************************************************************

APP

**********************************************************************/

import THREE from 'three'
import { TweenLite, TweenMax } from "gsap"
import OrbitControls from 'three-orbit-controls'
import _ from 'underscore'
import size from 'size'

/*----------  IMPORT COMPONENTS  ----------*/

import Stage from "./stage";
import Camera from "./camera";
import Cube from "./cube";
import Terrain from "./terrain";

const APP_CONFIG = {
	debug: false,
	gridDebugSize: {
		x: 10,
		y: 10
	},
	axisHelperSize: 10
}

class App {

	constructor(){
		_.bindAll(this, 'animate', 'onResize');

		this.time = 0;

		//SET-UP CAMERA
		let cameraOpts = {
			angle: 45,
			aspect: size.width / size.height,
			near: 1,
			far: 1000
		}
		
		this.camera = new Camera(cameraOpts);
		this.camera.position.y = 20;
		this.camera.position.z = 20;
		
		//SET-UP STAGE
		this.stage = new Stage();
		this.stage.add(this.camera);

		//SET-UP RENDERER
		this.renderer = new THREE.WebGLRenderer({ antialias: true});
		this.renderer.setSize(size.width, size.height);
		this.renderer.shadowMap.enabled = true;

		//SET-UP CONTROLS
		this.orbitControls = OrbitControls(THREE);
		this.controls = new this.orbitControls(this.camera);

		this.start();
	}

	start(){
		if (APP_CONFIG.debug){
			this.debug();
		}
		let container = document.querySelector('.stage');
		container.appendChild(this.renderer.domElement);
		
		//ADD A CUBE TO THE SCENE
		this.cube = new Cube(2);
		this.cube.position.y = 2;
		this.cube.rotation.z = Math.PI*0.25
		this.cube.rotation.y = Math.PI*0.5;
		this.stage.add(this.cube);

		//ADD A TERRAIN TO THE SCENE
		this.terrain = new Terrain(20, 20, 10, 10);
		this.stage.add(this.terrain);

		this.addLights();
		
		//ADD EVENTS LISTENER
		this.listen();

		TweenMax.ticker.addEventListener('tick', this.animate);
	}

	addLights() {
		let light = new THREE.AmbientLight( 0x404040 );
		this.stage.add( light );

	    let dirLight = new THREE.DirectionalLight(0x3597A8, 1);
	    dirLight.position.set(150, 150, 50);
	    dirLight.castShadow = true;
	    this.stage.add(dirLight);
	}
  
	debug(){		
		let gridHelper = new THREE.GridHelper( APP_CONFIG.gridDebugSize.x, APP_CONFIG.gridDebugSize.y );
		this.stage.add( gridHelper );
		let axisHelper = new THREE.AxisHelper( APP_CONFIG.axisHelperSize );
		this.stage.add( axisHelper );
	}

	listen(){
		let lazyLayout = _.debounce(this.onResize, 300);
		window.addEventListener('resize', lazyLayout);
	}

	onResize(e){
		this.renderer.setSize(size.width, size.height);
		this.camera.onResize(size.width, size.height);
	}
	
	animate(){
		this.cube.rotation.y = this.time*0.03;
		this.renderer.render(this.stage, this.camera);
		this.time++;
	}

}

new App();