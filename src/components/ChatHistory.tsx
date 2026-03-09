import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useContactStore, type ChatMessage } from '../store/useContactStore';
import '../styles/contact/ChatHistory.scss';

const ChatHistory: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { messages } = useContactStore();

    const formatTime = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const sidebarContent = (
        <>
            <div className={`chat-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h3>Xabarlar tarixi</h3>
                    <button
                        className="close-btn"
                        onClick={() => setIsOpen(false)}
                    >
                        &times;
                    </button>
                </div>

                <div className="sidebar-content">
                    {messages.length === 0 ? (
                        <p className="empty-msg text-secondary">
                            Hozircha xabarlar mavjud emas.
                        </p>
                    ) : (
                        messages.map((msg: ChatMessage, index: number) => (
                            <div key={index} className="chat-item-wrapper">
                                <div className="user-bubble">
                                    <p>{msg.message}</p>
                                    <span className="time">
                                        {formatTime(msg.timestamp)}
                                    </span>
                                </div>

                                {msg.adminReply && (
                                    <div className="admin-bubble">
                                        <p>{msg.adminReply}</p>
                                        <span className="admin-tag">
                                            Admin javobi
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
            {isOpen && (
                <div
                    className="chat-overlay"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </>
    );

    return (
        <>
            <div
                className={`chat-icon-fixed ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <svg viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                </svg>
                {messages.length > 0 && (
                    <span className="badge">{messages.length}</span>
                )}
            </div>

            {typeof document !== 'undefined' &&
                createPortal(sidebarContent, document.body)}
        </>
    );
};

export default ChatHistory;
