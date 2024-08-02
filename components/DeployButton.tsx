import Logo from "./Logo";

export default function DeployButton() {
  return (
    <a
      className="py-2 px-3 flex rounded-md no-underline hover:bg-zinc-800 duration-300 border"
      href="/"
      target="_blank"
      rel="noreferrer"
    >
      <Logo />
      Chatify
    </a>
  );
}