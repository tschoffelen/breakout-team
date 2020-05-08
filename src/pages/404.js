import React from "react";
import { Link } from "gatsby"

import Layout from "../components/layout";
import SEO from "../components/seo";

function NotFoundPage() {
    return (
        <Layout>
            <SEO title="Room not found"/>
            <div className="text-center mb-48">
                <h2 className="text-4xl font-bold pt-32 md:pt-64 mb-6">Sorry, room not found.</h2>
                <Link to="/" className="hover:underline">Create new groups &rarr;</Link>
            </div>
        </Layout>
    );
}

export default NotFoundPage;
