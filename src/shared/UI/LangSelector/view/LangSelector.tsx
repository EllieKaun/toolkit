import { useState, FC, useRef, useEffect } from "react"
import { Box } from "@mui/material"
import i18n from '../../../../i18next'

interface LangSelectorProps{
    defaultOption: string
}

const LangSelector:FC<LangSelectorProps> = (props) => {

    const {defaultOption} = props

    const options = ['ru', 'en']

    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState(defaultOption)

    const selectorRef = useRef<HTMLDivElement>(null)

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    const handleSetLang = (option: string) => {
        setIsOpen(false)
        setSelectedOption(option)
        i18n.changeLanguage(option)
        localStorage.setItem('lang', option)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if(selectorRef.current && !selectorRef.current.contains(event.target as Node)){
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.addEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return(
        <>
        <Box ref={selectorRef} 
            sx={{position: 'relative',
                '& button': {
                    pading: '10px',
                    fontSize: '18px',
                    background: '#fff',
                    border: 'none'
                },
                '& ul': {
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    border: '1px solid',
                    zIndex: 2,
                    background: '#fff'
                },
                '& li': {
                    padding: '12px',
                    cursor: 'pointer',
                    fontSize: '18px'
                }
            }}
        >
            <button onClick={handleOpen}>{selectedOption}</button>
            {isOpen && 
                <ul>
                    {options.map((item, i) => (
                        <li key={i} onClick={() => handleSetLang(item)}>
                            {item}
                        </li>
                    ))}
                </ul>
            }
        </Box>
        </>
    )
}

export default LangSelector