import React from 'react'
import HeroImg from '../img/hero-img.png'
import Header from '../components/Header'

function Home() {
    return (
        <>
            <Header />
            <section id="hero">
                <div className='hero-container'>
                    <h1>Welcome to Money Market</h1>
                    <h2>Start Your Trading Journey From Here...</h2>
                    <img src={HeroImg} />
                    <a href="/get-started" class="btn-get-started scrollto">Get Started</a>
                </div>
            </section>
        </>
    )
}

export default Home