import React, { useState } from "react";
import axios from "axios";

import Layout from "../components/layout";
import SEO from "../components/seo";

function IndexPage() {
    const [type, setType] = useState('auto');
    const [rooms, setRooms] = useState(['Room 1', 'Room 2', 'Room 3']);
    const [maxParticipants, setMaxParticipants] = useState('5');
    const [url, setUrl] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const submit = async() => {
        if (submitting) {
            return;
        }

        const roomsCount = rooms.filter((room) => !!room.trim().length).length;

        if (!roomsCount) {
            alert('Please add at least two rooms.');
            return;
        }

        setSubmitting(true);

        try {
            const { data } = await axios.post(
                `${window && window.location.href.indexOf('localhost') >= 0 ? 'https://breakout.team' : ''}/api/breakouts`,
                {
                    type,
                    rooms: rooms.filter((room) => !!room.trim().length),
                    maxParticipants
                }
            );

            setUrl(`https://breakout.team/room/${data.slug}`);
        } catch (e) {
            setSubmitting(false);
            alert('Sorry, something went wrong. Please try again.');
        }
    };

    return (
        <Layout>
            <SEO title="Create a new breakout room"/>

            <h1 className="text-xl flex items-center mb-4">
                <img src={require('../static/icon.png')} alt="icon" className="w-8 mr-3"/>
                Breakout Team
            </h1>
            <h2 className="text-4xl md:mr-20 leading-tight md:text-6xl font-bold">
                Simple video breakout rooms
            </h2>

            <section className="p-10 mt-8 md:mt-12 mb-16 rounded-md bg-white text-black">
                {url ? (
                    <>
                        <h3 className="text-gray-600 font-semibold mb-1 select-none">Your rooms link</h3>
                        <p className="text-2xl mb-6 select-all">{url}</p>
                        <p className="select-none">
                            Share this link to your new breakout rooms with anyone you want to
                            join the rooms. They can communicate via video and audio without
                            needing to install any additional software.
                        </p>
                    </>
                ) : (
                    <>
                        <h3 className="text-gray-600 font-semibold mb-1">Create new rooms</h3>
                        <label className="block flex items-center py-1">
                            <input
                                className="form-radio mr-3 text-indigo-600"
                                name='type'
                                checked={type === 'auto'}
                                onChange={() => {
                                    setType('auto');
                                    setRooms(['Room 1', 'Room 2', 'Room 3']);
                                }}
                                type="radio"/>
                            Automatically assign to a room
                        </label>
                        <label className="block flex items-center py-1">
                            <input
                                className="form-radio mr-3 text-indigo-600"
                                name='type'
                                checked={type === 'choice'}
                                onChange={() => {
                                    setType('choice');
                                    setRooms(['']);
                                }}
                                type="radio"/>
                            Let participants choose
                        </label>

                        {type === 'auto' ? (
                            <>
                                <h3 className="text-gray-600 font-semibold mb-2 mt-8">Number of rooms</h3>
                                <label className="block flex items-center">
                                    <input
                                        className="mr-3 form-input w-16"
                                        type="number"
                                        value={rooms.length}
                                        onChange={(e) => {
                                            const x = Math.min(10, Math.max(1, parseInt(e.target.value) || 1));
                                            const newRooms = [];
                                            let y = 0;
                                            while (y < x) {
                                                newRooms.push(`Room ${y + 1}`);
                                                y++;
                                            }
                                            setRooms(newRooms);
                                        }}
                                        min={1}
                                        max={10}/>
                                    <span className="pt-1">rooms</span>
                                </label>
                            </>
                        ) : (
                            <>
                                <h3 className="text-gray-600 font-semibold mt-8">Room names</h3>
                                <div className="flex items-end">
                                    <div className="flex-1">
                                        {rooms.map((room, index) => (
                                            <input
                                                className="form-input w-full mt-2"
                                                key={`topic${index}`}
                                                value={rooms[index]}
                                                placeholder={`Topic ${index + 1}`}
                                                onChange={(e) => {
                                                    const newRooms = [...rooms];
                                                    newRooms[index] = e.target.value;
                                                    setRooms(newRooms);
                                                }}
                                                type="text"/>
                                        ))}
                                    </div>
                                    <button
                                        className="py-1 px-3 border-solid border-2 border-indigo-600 bg-indigo-600 ml-4 text-white font-bold rounded-md text-xl"
                                        onClick={() => {
                                            const newRooms = [...rooms, ''];
                                            setRooms(newRooms);
                                        }}>
                                        +
                                    </button>
                                </div>

                                <h3 className="text-gray-600 font-semibold mb-2 mt-8">Maximum room size</h3>
                                <label className="block flex items-center">
                                    <input
                                        className="mr-3 form-input w-16"
                                        type="number"
                                        value={maxParticipants}
                                        onChange={(e) => setMaxParticipants(e.target.value)}
                                        min={1}
                                        max={10}/>
                                    <span className="pt-1">participants per room</span>
                                </label>
                            </>
                        )}

                        <button
                            className={`py-3 px-8 bg-indigo-600 mt-12 text-white font-bold rounded-md ${submitting ? 'opacity-50' : ''}`}
                            onClick={() => submit()}>
                            Create rooms
                        </button>
                    </>
                )}
            </section>
        </Layout>
    );
}

export default IndexPage;
