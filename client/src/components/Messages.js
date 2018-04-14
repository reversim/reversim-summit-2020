import React from 'react';
import cn from 'classnames';
import s from './Messages.css';
import ReactMarkdown from 'react-markdown';

const Messages = ({ messages }) => {
	if (messages.length) {
		return <ul className={cn(s.messages, "font-size-lg")}>
				{messages.map(msg => (
					<li key={msg._id} className={s.message}><i className="fa fa-info-circle mr-3 text-info"/>
						<ReactMarkdown source={msg.text} />
					</li>
				))}
			</ul>
	} else {
		return null;
	}
};

export default Messages;