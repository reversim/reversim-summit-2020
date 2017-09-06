import React, { Component } from 'react';
import Header from './Header';
import cn from 'classnames';
import s from './About.css';

class About extends Component {

    render() {
        const {  } = this.props;
        return (
            <section className={s.wrapper}>
                <Header title={this.props.title} />
                <div className={cn("section-content","row", "justify-content-center", "pt-3")}>
                    <div className={cn(s.image, "section-content--image", "col", "mr-5")}>
                        <h1>Im an image</h1>
                    </div>
                    <div className={cn(s.sectionContent, "col", "pr-5")}>
                        <h4 className="font-weight-bold">General Info</h4>
                        <label className="font-weight-bold">About Reversim Summit</label>
                        <p>Reversim summit is our intention to create a conference for developers by developers. Like in the podcast, we bring you the content we are interested in, and we hope you will be too.

                        This is the fifth(!) Reversim Summit. The summits of 2013 and 2014 (TLV Campus), 2015 (Technion) and 2016 (Weizmann Institute of Science) also featured community content. Watch previous years' sessions to get the general feel of the Revesim Summit spirit.</p>
                        
                        <label className="font-weight-bold">About Reversim Podcast</label>
                        <p>Reversim (רברס עם פלטפורמה) is a Hebrew podcast by Ori Lahav and Ran Tavory which brings together software developers and product, with over 300 recorded episodes and a few thousands listners.</p>
                    </div>
                </div>
            </section>
        );
    }

}

export default About;