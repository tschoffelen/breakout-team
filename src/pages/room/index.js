import React from "react";
import axios from "axios";
import useSWR from "swr";
import { Link, navigate } from "gatsby";

import { presenceId } from "../../utils/presence";
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import NotFoundPage from "../404";
import Video from "../../components/video";

const Loading = () => (
    <Layout>
        <div className="flex min-h-screen items-center justify-center text-gray-500">
            Loading...
        </div>
    </Layout>
);

function RoomPage({ '*': match }) {
    const [slug, room] = match.split('/');
    const { data, error } = useSWR(
        `${window && window.location.href.indexOf('localhost') >= 0 ? 'https://breakout.team' : ''}/api/breakouts/${slug
        }?presence=${presenceId()}&room=${encodeURIComponent(room || '')}`,
        axios.get,
        {
            refreshInterval: 10000
        }
    );

    if (!data && !error) {
        return (
            <Loading/>
        );
    }

    if (error || (data && !data.data)) {
        return (
            <NotFoundPage/>
        );
    }

    const item = data.data;

    if (!room) {
        if (item.type === 'auto') {
            const newRoom = item.rooms[Math.floor(Math.random() * item.rooms.length)];
            navigate(`/room/${slug}/${newRoom[0]}`);
            return (
                <Loading/>
            );
        }

        return (
            <Layout>
                <h2 className="text-4xl leading-tight font-bold">
                    Choose a room
                </h2>
                <section className="mt-8 md:mt-12 mb-16 rounded-md bg-white text-black">
                    {item.rooms.map((room, index) => (
                        <Link
                            to={`/room/${slug}/${room[0]}`}
                            className={`block p-10 ${index < item.rooms.length - 1 ? 'border-b border-gray-200' : ''}`}>
                            <strong>{room[1]} &rarr;</strong>
                        </Link>
                    ))}
                </section>
            </Layout>
        );
    }

    const matchedRoom = item.rooms.find(([id]) => id === room);
    if (!matchedRoom) {
        navigate(`/room/${slug}`);
        return (
            <Loading/>
        );
    }

    return (
        <Layout fullsize>
            <SEO title="Breakout room"/>
            <div className="flex flex-col h-screen">
                <div className="flex justify-between bg-black items-center p-6">
                    <div className="flex items-center">
                        {item.type !== 'auto' ? (
                            <Link
                                className="inline-block py-1 px-2 rounded-md bg-gray-700 text-black font-bold mr-5"
                                to={`/room/${slug}`}
                            >&larr;</Link>
                        ) : null}
                        <strong>{matchedRoom[1]}</strong>
                    </div>
                    <div className="opacity-50 text-sm">https://breakout.team/room/{slug}</div>
                </div>
                <Video id={matchedRoom[0]} title={matchedRoom[1]}/>
            </div>
        </Layout>
    );
}

export default RoomPage;
