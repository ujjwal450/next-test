// import { useEffect, useState } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

const HomePage = (props) => {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);
  // useEffect(() => {
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly active React meetups"/>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export async function getServerSideProps(context){
//   const req = context.req
//   const res = context.res
//   //fetch data from an api
//   return {
//     props:{
//       meetups:DUMMY_MEETUPS
//   }
// }

export async function getStaticProps() {
  const clint = await MongoClient.connect(
    "mongodb+srv://rytrox:creepyno1456@cluster0.z7fxp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = clint.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  clint.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}
export default HomePage;
