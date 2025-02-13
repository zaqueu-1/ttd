import React from "react"
import "./socials.css"
import { VscGithub } from "react-icons/vsc"
import { BsInstagram } from "react-icons/bs"
import { AiOutlineLinkedin } from "react-icons/ai"
import { useTranslation } from "react-i18next"

function Socials() {
  const { i18n } = useTranslation()

  const takeMeTo = (link) => {
    if (link === "github") {
      window.open("https://github.com/zaqueu-1")
    } else if (link === "insta") {
      window.open("https://www.instagram.com/zaqueu.tech/")
    } else if (link === "linkedin") {
      window.open("https://www.linkedin.com/in/zaqueu1")
    }
  }

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    localStorage.setItem("language", lng)
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className='footer-container'>
        <div className='title'>
          <h2>tá pago!</h2>
        </div>

        <div className='social'>
          <button onClick={() => takeMeTo("github")} className='social-btn'>
            <VscGithub />
          </button>
          <button onClick={() => takeMeTo("insta")} className='social-btn'>
            <BsInstagram />
          </button>
          <button
            onClick={() => takeMeTo("linkedin")}
            className='social-btn linkedin'
          >
            <AiOutlineLinkedin />
          </button>
          <div className='language-buttons'>
            <button
              className={`lang-btn ${i18n.language === "pt" ? "active" : ""}`}
              onClick={() => changeLanguage("pt")}
            >
              PT
            </button>
            <button
              className={`lang-btn ${i18n.language === "en" ? "active" : ""}`}
              onClick={() => changeLanguage("en")}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Socials
