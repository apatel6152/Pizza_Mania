import axios from "axios";
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Featured from '../components/Featured'
import PizzaList from '../components/PizzaList'


export default function Home({ pizzaList }) {
  return (
    <>
      <Head>
        <title>Pizza Mania</title>
        <meta name="description" content="Best Pizza of World" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <PizzaList pizzaList={pizzaList}/>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  
  const res = await axios.get("http://localhost:3000/api/products");
  // console.log(res.data);
  return {
    props: {
      pizzaList: res.data,
    },
  };
};