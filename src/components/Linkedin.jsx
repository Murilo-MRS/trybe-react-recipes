import React from 'react';
import linkedin from '../images/TimeDev/linkedin.svg';
import '../styles/linkedin.css';

export default function Linkedin() {
  return (
    <>
      <div>
        <h6>Time de desenvolvimento:</h6>
      </div>

      <div className="linkedin-container">
        <div className="linkedin">
          <a href="https://www.linkedin.com/in/jefferson-felix/" target="_blank" rel="noreferrer">

            <h6>Jefferson Felix</h6>
            <img src={ linkedin } alt="logo-linkedin" />
          </a>
        </div>
        <div className="linkedin">

          <a href="https://www.linkedin.com/in/murilo-rodrigues-santana/" target="_blank" rel="noreferrer">
            <h6>Murilo Santana</h6>
            <img src={ linkedin } alt="logo-linkedin" />
          </a>
        </div>
        <div className="linkedin">

          <a href="https://www.linkedin.com/in/diogocav/" target="_blank" rel="noreferrer">
            <h6>Diogo Vieira</h6>
            <img src={ linkedin } alt="logo-linkedin" />
          </a>
        </div>
        <div className="linkedin">

          <a href="https://www.linkedin.com/in/luizfelipexavier/" target="_blank" rel="noreferrer">
            <h6>Luiz Xavier</h6>
            <img src={ linkedin } alt="logo-linkedin" />
          </a>
        </div>
        <div className="linkedin">

          <a href="https://www.linkedin.com/in/kauegz/" target="_blank" rel="noreferrer">
            <h6>Kauê Guilherme</h6>
            <img src={ linkedin } alt="logo-linkedin" />
          </a>
        </div>
      </div>

    </>
  );
}
