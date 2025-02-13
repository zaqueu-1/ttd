import React from "react"
import { useTranslation } from "react-i18next"
import "./hero.css"

function Hero() {
  const { t } = useTranslation()

  return (
    <div className='hero-container'>
      <h1>{t("app.title")}</h1>
      <p>{t("app.subtitle")}</p>
    </div>
  )
}

export default Hero
