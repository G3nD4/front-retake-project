import { Footer, NavBar } from "../page";

export default function About() {
  return (
    <>
      <main className="h-full w-full ">
        <section className="p-10 h-fit w-full flex flex-col items-center gap-12 bg-[#edf2f4] text-[#2B2D42]">
          <NavBar />
          <h1 className="gap-3 text-5xl font-bold flex justify-center">
            About <span className="text-[#EF233C]">us</span>
          </h1>
          <div className="py-8 px-8 rounded-xl bg-[#dde1e2] shadow-lg">
            <h1 className="font-bold text-[4vh] leading-relaxed ">
              Our mission
            </h1>
            <p className="text-xl font-semibold max-w-xl">
              Our mission is to simplify the process of gift-giving and help you
              bring your dreams to life. No more duplicated gifts, wasted money
              on unwanted items, or last-minute panic shopping. With App Name,
              you can stay organized, plan ahead, and ensure that you receive
              gifts that truly matter to you.
            </p>
            <h1 className="font-bold text-3xl leading-relaxed ">Interface</h1>
            <p className="text-xl font-semibold max-w-xl">
              Easy and Intuitive Interface: Our user-friendly design ensures
              that creating and managing wish lists is effortless
            </p>
            <h1 className="font-bold text-3xl leading-relaxed ">App name</h1>
            <p className="text-xl font-semibold max-w-xl">
              App Name is more than just an app; it&apos;s your ultimate tool
              for organizing, sharing, and realizing your dreams. So why wait?
              Start using App Name today and experience the thrill of having
              your wishes within reach!
            </p>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
