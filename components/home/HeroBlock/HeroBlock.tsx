import Image from "next/image";
import { SearchToolForm } from '@/components/forms/SearchToolForm/SearchToolForm';
import { Container } from '@/components/home/HeroBlock/ui/Container/Container';
import css from "./HeroBlock.module.css";

export default function HeroBlock() {
  return (
    <section className={css.root}>
      {/* <Image className={css.image} src={"/images/hero-banner.png"} alt="Зображення HeroBlock" fill priority  /> */}
      
      <Container className={css.container}>

        <div className={css.inner}>
          <h1 className={css.title}>ToolNext — ваш надійний сусід</h1>
          <SearchToolForm />
        </div>
        
      </Container>


    </section>
  )
}