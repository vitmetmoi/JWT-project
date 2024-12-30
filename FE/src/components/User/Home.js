import React from 'react';
import './Home.scss'
function ConfirmDeleteModal(props) {



    return (

        <>
            <div class="jwt-documentation">
                <div class="jwt-header">
                    <h1 class="doc-title">JSON Web Tokens (JWT): Technical Documentation</h1>
                    <div class="doc-metadata">
                        Reference Document ID: JWT-2024-01<br></br>
                        Last Updated: December 2024<br></br>
                        Category: Web Security & Authentication
                    </div>
                </div>

                <div class="doc-abstract">
                    This technical document provides a comprehensive overview of JSON Web Tokens (JWT), their implementation, security considerations, and best practices for web applications and APIs. JWT represents a modern approach to handling authentication and authorization in distributed systems.
                </div>

                <div class="doc-section">
                    <h2 class="section-title">1. Introduction to JWT</h2>
                    <p>JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact, URL-safe means of representing claims between two parties. These claims are encoded as a JSON object that is digitally signed using a JSON Web Signature (JWS).</p>

                    <div class="doc-subsection">
                        <h3 class="subsection-title">1.1 Core Characteristics</h3>
                        <ul>
                            <li>Compact, self-contained tokens</li>
                            <li>Cryptographically signed</li>
                            <li>Platform and language independent</li>
                            <li>Standardized (RFC 7519)</li>
                        </ul>
                    </div>
                </div>

                <div class="doc-section">
                    <h2 class="section-title">2. Token Structure</h2>
                    <div class="code-example">
                        Header.Payload.Signature
                    </div>

                    <div class="doc-subsection">
                        <h3 class="subsection-title">2.1 Header Component</h3>
                        <p>Contains metadata about the token type and signing algorithm.</p>
                        <div class="code-example">

                            "alg": "HS256",
                            "typ": "JWT"

                        </div>
                    </div>

                    <div class="doc-subsection">
                        <h3 class="subsection-title">2.2 Payload Component</h3>
                        <p>Contains the claims (statements about an entity) and additional data.</p>
                    </div>
                </div>

                <div class="doc-section">
                    <h2 class="section-title">3. Security Considerations</h2>
                    <div class="note-box">
                        <strong>Important:</strong> JWTs should be transmitted over HTTPS to prevent token interception and maintain security integrity.
                    </div>

                    <div class="doc-subsection">
                        <h3 class="subsection-title">3.1 Best Practices</h3>
                        <ul>
                            <li>Use strong secret keys</li>
                            <li>Implement token expiration</li>
                            <li>Validate all claims</li>
                            <li>Store tokens securely</li>
                        </ul>
                    </div>
                </div>

                <div class="reference-list">
                    <h2 class="section-title">References</h2>
                    <ol>
                        <li>RFC 7519 - JSON Web Token (JWT)</li>
                        <li>JWT.IO - JWT Debugging and Validation</li>
                        <li>IETF OAuth Working Group Documentation</li>
                    </ol>
                </div>
            </div>
        </>

    );
}

export default ConfirmDeleteModal;