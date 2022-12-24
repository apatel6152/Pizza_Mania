import axios from "axios";
import Head from 'next/head'
import Image from 'next/image'
import { useState } from "react";
import Featured from '../components/Featured'
import PizzaList from '../components/PizzaList'
import AddButton from "../components/AddButton";
import Add from "../components/Add";


export default function Home({ pizzaList, admin }) {
  const [close, setClose] = useState(true);
  return (
    <>
      <Head>
        <title>Pizza Mania</title>
        <meta name="description" content="Best Pizza of World" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {admin && <AddButton setClose={setClose} />}
      <PizzaList pizzaList={pizzaList}/>
      {!close && <Add setClose={setClose} />}
    </>
  )
}

export const getServerSideProps = async (ctx) => {

  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }
  
  const res = await axios.get("http://localhost:3000/api/products");
  // console.log(res.data);
  return {
    props: {
      pizzaList: res.data,
      admin
    },
  };
};