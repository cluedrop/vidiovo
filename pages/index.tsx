
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import * as THREE from 'three';

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = () => setIsDark(!isDark);

  const parallaxRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: parallaxRef });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    document.body.className = isDark ? 'dark font-ultrabold' : 'font-ultrabold';
  }, [isDark]);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const canvas = document.getElementById('three-bg');
    if (canvas) canvas.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(5, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x8833ff, wireframe: true });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    scene.add(light);

    camera.position.z = 15;

    const animate = () => {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.003;
      mesh.rotation.y += 0.005;
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return (
    <div className="font-ultrabold bg-white dark:bg-black text-black dark:text-white transition-colors duration-700">
      <Head>
        <title>Hana – Web Developer</title>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap" rel="stylesheet" />
      </Head>

      <div className="fixed top-4 right-4 z-50">
        <button
          className="border border-white px-4 py-2 rounded-full text-sm hover:bg-white hover:text-black transition"
          onClick={toggleTheme}
        >
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <div id="three-bg" className="absolute top-0 left-0 w-full h-full -z-10" />

      <section ref={parallaxRef} className="h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div
          style={{ y: yParallax }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-purple-500">
            Hello, I'm Hana
          </h1>
          <motion.p
            className="mt-6 text-xl md:text-2xl text-gray-400 dark:text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Web Developer in the Making 💻✨
          </motion.p>
        </motion.div>
      </section>

      <section className="py-32 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-4">Who is Hana?</h2>
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            I'm a passionate self-taught developer diving deep into the world of code. Currently learning React, Next.js, and crafting beautiful web experiences. I love building things that feel alive.
          </p>
        </motion.div>
      </section>

      <section className="py-32 bg-gray-50 dark:bg-gray-900 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[1, 2].map((project, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03, rotate: 1 }}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-black border dark:border-gray-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition"
              >
                <h3 className="text-2xl font-semibold mb-2">Project Title #{project}</h3>
                <p className="text-gray-600 dark:text-gray-400">Brief description of the project goes here. What it does, what tech stack, etc.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-4">Blog</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Coming soon: My journey into the web world. Stay tuned for tech tips, tutorials, and thoughts.
          </p>
        </motion.div>
      </section>

      <section className="py-32 bg-gray-100 dark:bg-gray-800 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Let’s Connect</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Want to work together or just say hi? Email me at <a href="mailto:hana.dev@email.com" className="text-purple-500">hana.dev@email.com</a>
          </p>
          <div className="flex justify-center gap-6 text-xl">
            <Link href="#"><a className="hover:text-purple-500">GitHub</a></Link>
            <Link href="#"><a className="hover:text-purple-500">LinkedIn</a></Link>
          </div>
        </div>
      </section>

      <footer className="text-center text-sm text-gray-500 py-6">
        Built with ❤️ by Hana • 2025
      </footer>
    </div>
  );
}
