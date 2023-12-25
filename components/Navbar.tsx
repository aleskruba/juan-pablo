"use client" // this is a client component
import React,{useEffect,useRef} from "react"
import { useState } from "react"
import { Link } from "react-scroll/modules"
import { useTheme } from "next-themes"
import { RiMoonFill, RiSunLine } from "react-icons/ri"
import { IoMdMenu, IoMdClose } from "react-icons/io"
import { Us,Es,Cz } from "react-flags-select";
import { useLanguageContext } from "@/context/language-context"

import AuthForm from "./LoginGoogle"

interface NavItem {
  label: string
  page: string
}

const NAV_ITEMS_EN: Array<NavItem> = [
  {
    label: "About me",
    page: "home",
  },

  {
    label: "Spanish teacher",
    page: "about",
  },
  {
    label: "Tourist guide in Medellin",
    page: "projects",
  },
  {
    label: "Contact me",
    page: "contact",
  },
]

const NAV_ITEMS_ES: Array<NavItem> = [
  {
    label: "Acerca de mi",
    page: "home",
  },

  {
    label: "Profesor de español",
    page: "about",
  },
  {
    label: "Guía turístico en Medellín",
    page: "projects",
  },
  {
    label: "Contáctame",
    page: "contact",
  },
]

const NAV_ITEMS_CZ: Array<NavItem> = [
  {
    label: "O mně",
    page: "home",
  },

  {
    label: "Učitel španělštiny",
    page: "about",
  },
  {
    label: "Průvodce v Medellinu",
    page: "projects",
  },
  {
    label: "Kontaktujte mě",
    page: "contact",
  },
]
export default function Navbar() {
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === "system" ? systemTheme : theme
  const [navbar, setNavbar] = useState(false)

  const {selected, setSelected} = useLanguageContext()


  type Language = 'Us' | 'Cz' | 'Es';

  const countries: Language[] = ['Us', 'Es', 'Cz'];

  const handleFlagClick = (code:Language) => {
    if (selected !== code) {
      setSelected(code);
    }
  };

  const [open,setOpen] =useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(()=>{
      let handler = (e:MouseEvent) => {
        
        if(menuRef.current &&!menuRef.current.contains(e.target as Node)) {
            setOpen(false)
            setNavbar(false)

        }
      }

      document.addEventListener('mousedown', handler)
     // document.addEventListener('scroll', handler)

      return() => {
        document.removeEventListener('mousedown',handler)
      }
  })


  return (
    <header className="w-full mx-auto  px-4 sm:px-20 fixed top-0 z-50 shadow bg-white dark:bg-stone-900  md:opacity-100  dark:border-b dark:border-stone-600">
      <div className="justify-between  md:items-center md:flex">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link to="home">
              <div className="container flex items-center space-x-2">
                <h2 className="text-2xl font-bold">Juan Pablo</h2>
              </div>
            </Link>
            <div className="md:hidden"  >
              <button
                className="p-2 text-gray-800 dark:text-gray-100 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() =>{ setNavbar(!navbar); setOpen(true)}}
              
              >
                {navbar ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
              </button>
            </div>
          </div>
        </div>

        <div>
          <div ref={menuRef}
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}  
          >
            <div className="items-center justify-center space-y-4 md:flex md:space-x-6 md:space-y-0">
              {selected === 'Us' && NAV_ITEMS_EN.map((item, idx) => {
                return (
                  <Link
                    key={idx}
                    to={item.page}
                    className={
                      "block lg:inline-block text-neutral-900  hover:text-neutral-500 dark:text-neutral-100"
                    }
                    activeClass="active"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    onClick={() => setNavbar(!navbar)}
                  >
                    {item.label}
                  </Link>
                )
              })}

          {selected === 'Es' && NAV_ITEMS_ES.map((item, idx) => {
                return (
                  <Link
                    key={idx}
                    to={item.page}
                    className={
                      "block lg:inline-block text-neutral-900  hover:text-neutral-500 dark:text-neutral-100"
                    }
                    activeClass="active"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    onClick={() => setNavbar(!navbar)}
                  >
                    {item.label}
                  </Link>
                )
              })}

            {selected === 'Cz' && NAV_ITEMS_CZ.map((item, idx) => {
                return (
                  <Link
                    key={idx}
                    to={item.page}
                    className={
                      "block lg:inline-block text-neutral-900  hover:text-neutral-500 dark:text-neutral-100"
                    }
                    activeClass="active"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    onClick={() => setNavbar(!navbar)}
                  >
                    {item.label}
                  </Link>
                )
              })}



                <div className="flex justify-start md:justify-center gap-4">
                  <div>
          {currentTheme === "dark" ? (
                <button
                  onClick={() => setTheme("light")}
                  className="bg-slate-100 p-2 rounded-xl"
                >
                  <RiSunLine size={25} color="black"  />
                </button>
              ) : (
                <button
                  onClick={() => setTheme("dark")}
                  className="bg-slate-100 p-2 rounded-xl"
                >
                  <RiMoonFill size={25} color="black" />
                </button>
              )}

          </div>

            <div className="flex flex-col justify-center gap-0 h-[50px] relative">
              {countries.map((countryCode) => (
                <div key={countryCode} onClick={() => handleFlagClick(countryCode)}>
                  {selected !== countryCode && (
                    <>
                      {countryCode === 'Us' ? <Us  /> : null}
                      {countryCode === 'Es' ? <Es /> : null}
                      {countryCode === 'Cz' ? <Cz /> : null}
                    </>
                  )}
                </div>
              ))}
            </div>

            </div>

           <div >
              <AuthForm/> 


              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}