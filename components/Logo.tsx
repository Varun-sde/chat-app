import Image from "next/image";
import logo from "../images/chatify-logo.png"

const Logo = () => {
  return (
    <Image src={logo} alt="logo" height={24} width={24} className="mr-1 logo"/>
  )
}

export default Logo