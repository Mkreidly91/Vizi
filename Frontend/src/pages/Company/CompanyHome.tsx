import companyHero from '../../assets/images/company-home/InteriorWide.png';
// import Button from "../../components/Common/Button";
import Navbar from '../../components/Navbar';
import logo1 from '../../assets/images/company-home/Vector-1.png';
import logo2 from '../../assets/images/company-home/Vector-4.png';
import logo3 from '../../assets/images/company-home/Vector-5.png';
import logo4 from '../../assets/images/company-home/Vector.png';
import laptop from '../../assets/images/company-home/Laptop.png';
import InView from '../../components/animation/InView';
import V360 from '../../components/3d/DemoPanoViewer';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';

const CompanyHome = () => {
  return (
    <div className=" overflow-x-hidden">
      <section className="hero h-[100vh] relative ">
        <Navbar className="absolute top-0  w-full z-50" />
        <div>
          <div className="bg-black w-full h-full absolute z-10 opacity-50"></div>
          <img
            src={companyHero}
            alt=""
            className="w-full h-full object-cover absolute top-0 left-0 -z-1"
          />
        </div>

        <InView
          transform="translateY(100px)"
          className="hero-text flex flex-col items-center justify-center w-full h-full  gap-10 z-10 text-white relative mx-auto
           "
        >
          <span className="text-center text-2xl md:text-6xl w-[80%] font-semibold max-w-[800px] ">
            Showcase Your Construction Projects with Immersive 3D Tours
          </span>
          <Link to="/getStarted">
            <Button
              variant="gradient"
              className="bg-gradient-to-r from-slate-700 to-slate-500 p-4 font-sora font-normal uppercase tracking-wider px-10"
              size="lg"
            >
              Get Started
            </Button>
          </Link>
        </InView>
      </section>
      <section className="hero h-fit relative p-5 ">
        <div className="clients flex flex-col text-gray-600">
          <div className="flex flex-col gap-3 items-center text-center">
            <span className=" text-3xl font-semibold">Our Clients</span>
            <span className="">
              We have been working with some fortune 500 clients
            </span>
          </div>
        </div>

        <div className="company-logos flex gap-20 justify-center py-10">
          <img src={logo1} alt="" className="object-contain" />
          <img src={logo2} alt="" className="object-contain" />
          <img src={logo3} alt="" className="object-contain" />
          <img src={logo4} alt="" className="object-contain" />
        </div>

        <div className="laptop flex items-center justify-center text-center">
          <div className="flex md:flex-row md:justify-between items-center max-w-[90%]">
            <InView transform="translateY(100px) w-fit" delay="0.5">
              <div className="laptop-text flex flex-col items-center justify-center md:pr-12">
                <span className=" text-2xl md:text-5xl font-semibold w-4/5">
                  Unlock the power of 3D virual tours
                </span>
                <br />
                <span className="w-3/5 text-center text-lg hidden md:block">
                  Live Virtual Experience – search, explore, and discuss with
                  friends or family in real time.
                </span>
              </div>
            </InView>
            <InView transform="translateX(100px)" delay="0.8">
              <img src={laptop} alt="" className="" />
            </InView>
          </div>
        </div>
      </section>
      <section className="flex flex-col h-[50vh]  w-full  justify-center items-center  relative md:h-[100vh]  ">
        <InView delay="1.2" className="w-[80%]     ">
          <V360 className={'rounded-2xl m-auto border-none'} />
        </InView>
        <div className="pano-bg  h-full w-full z-[-1] absolute  ">
          <div className="white-bg h-[25vh] w-full bg-white md:h-[50vh]"></div>
          <div className="grey-bg h-[25vh] w-full bg-neutral-900 md:h-[50vh] "></div>
        </div>
      </section>

      <section className="bg-neutral-900 py-10">
        <div className="pano-text flex flex-col items-center  gap-14 text-white mt-[-5%]">
          <span className="font-semibold  text-center text-2xl md:text-4xl md:w-1/2 w-9/12 pt-7 ">
            Immerse Your Audience with Interactive Panoramas
          </span>
          <span className="md:w-8/12 w-11/12 text-center font-sora md:text-lg text-base font-light tracking-wide">
            Our panoramic images redefine property presentations. Seamlessly
            integrate hotspots and floor plans to give clients a comprehensive
            view. Elevate your listings and captivate your audience in the world
            of real estate. Welcome to the future of property presentation
          </span>
          <div className="features display flex flex-col gap-10 w-full  md:pb-16">
            <span className="features-title text-center font-semibold  text-2xl md:text-4xl">
              Features
            </span>

            <div className="features-wrapper flex gap-5 items-center justify-center font-light md:text-2xl md:gap-40">
              <div className="flex flex-col md:gap-12 gap-10">
                <span className=" underline underline-offset-8">
                  1. Company portfolio
                </span>
                <span className=" underline underline-offset-8">
                  2. Curated 3D tours
                </span>
              </div>
              <div className="flex flex-col md:gap-12 gap-10">
                <span className=" underline underline-offset-8">
                  3. Search homes
                </span>
                <span className=" underline underline-offset-8">
                  4. Apply digitally
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="get-started-footer flex flex-col gap-10 items-center py-10">
          <span className="font-semibold text-xl md:text-4xl  w-3/5 md:w-4/12 text-center">
            Transform your presence with a 3D edge
          </span>

          <Link to="/getStarted#top">
            <Button
              variant="gradient"
              className="bg-gradient-to-r from-slate-700 to-slate-500 p-4 font-sora font-normal uppercase tracking-wider px-10"
              size="lg"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CompanyHome;
