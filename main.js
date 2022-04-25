import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let scene, camera, renderer, pointLight, control;
// シーンを追加
scene = new THREE.Scene();

window.addEventListener("load", init, false);

function init() {
  // カメラを追加
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.set(0, 0, 500);

  // テクスチャを追加
  // let textures = new THREE.TextureLoader().load("./images/earth.jpg");

  // レンダラーを追加
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);
  renderer.render(scene, camera);

  // ジオメトリ作成
  let ballGeometry = new THREE.SphereGeometry(100, 64, 32);

  // マテリアル作成
  let ballMaterial = new THREE.MeshPhysicalMaterial({ map: textures });

  // メッシュ化
  let ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
  scene.add(ballMesh);

  // 平行光源を追加
  let directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // ポイント光源を追加
  pointLight = new THREE.PointLight(0xffffff, -1);
  pointLight.position.set(-200, -200, -200);
  scene.add(pointLight);

  // ポイント光源がどこにあるかを表示
  let pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
  scene.add(pointLightHelper);

  // マウス操作ができるようにする
  control = new OrbitControls(camera, renderer.domElement);
  window.addEventListener("resize", onWindowResize, false);
  animate();
}

//　ブラウザのリサイズ時に対応させよう
function onWindowResize() {
  // サイズを随時更新
  renderer.setSize(window.innerWidth, window.innerHeight);
  //　カメラのアスペクト比を更新
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

function animate() {
  // ポイント光源の球の周りを巡回させよう
  pointLight.position.set(
    200 * Math.sin(Date.now() / 500),
    200 * Math.sin(Date.now() / 1000),
    200 * Math.cos(Date.now() / 500)
  );
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
// レンダリング
renderer.render(scene, camera);
