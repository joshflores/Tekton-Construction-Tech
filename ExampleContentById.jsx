import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Button, Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { shape } from 'prop-types';

const Content = (props) => {
    const [mappedContent, setContent] = useState([]);
    const [mappedOtherContent, setOtherContent] = useState([]);
    let org = props.org;
    const [eTypeId] = useState(3);

    const [currentPosition] = useState({
        lat: props.org.loc?.latitude,
        lng: props.org.loc?.longitude,
    });

    const location = () => {
        return currentPosition;
    };

    useEffect(() => {
        if (props.org?.content) {
            let mappedContent = props.org.content?.map(mapContent);
            setContent(mappedContent);
            let mappedOtherContent = props.org.OtherContent?.map(mapOtherContent);
            setOtherContent(mappedOtherContent);
        }

        navigator.geolocation.getCurrentPosition(location);
    }, [currentPosition, org]);

    const mapContent = (content) => {
        return (
                <Col>
                    <Badge bg="" key={content?.id} className="content-type mt-2 badge-info-lighten d-block "> {content.contentType?.name} </Badge > 
                </Col>
        );
    };

    const mapOtherContent = (content) => {
        return (
            <>
            <Col className="org-wrapper">
                <h3> {content?.name} </h3>  
                <Row className='content-info-cards'>
                    <Col key={content?.id}>
                        <Image className='content-avatar' src={` ${content?.avatarUrl} `} alt="Card image"></Image>
                        <Button className='org-button-links m-2' variant="primary" href={`mailto:${content?.email}`}>Email</Button>
                    </Col>
                </Row>
            </Col>
            </>
        );
    };

    return (
        <ThemeProvider
            breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
            minBreakpoint="xxs"
        >
            <Container fluid className='mainContent-wrapper'>
                <Col>
                    <Col className="content-wrapper">
                        <Row>
                            <Col xs lg="4" className='content-wrapper-background'>
                                <Image className='content-logo' fluid src={`${content.logo}`} />
                            </Col>
                            <Col className='mt-2'>
                                <h1>{content.name}</h1>
                                <h6>{content.contentType?.name} • {content.employeesNumber} Employees</h6>
                                <h6>{content.phone} • {content.loc?.one} {content.location?.two}, {content.loc?.city}, {content.loc?.state.zipCode} </h6>
                                <Button className='content-button-links' variant="primary" href={`https://${content.siteUrl}`}>Website</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col className='org-wrapper mb-0 p-2'>
                        <Row>
                            <h3>About </h3>
                            <hr />
                            <h6>{content.description}</h6>
                        </Row>
                    </Col>
                    <Row>
                        <Col lg={4} className="pr-0 otherContent-info-cards">
                            {mappedContent}
                        </Col>
                        <Col className="content-map-wrapper">
                            <Row className="content-wrapper content-map-media-styling">
                                <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
                                    <GoogleMap
                                    mapContainerClassName="content-google-map"
                                    center={{lat: props.content.location?.latitude, lng: props.content.location?.longitude}}
                                    zoom={15}
                                    >
                                        <>
                                        {
                                            props.org.location?.latitude && (
                                                <Marker position={{lat: props.content.location?.latitude, lng: props.content.location?.longitude}}/>
                                            )
                                        }
                                        </>
                                    </GoogleMap>
                                </LoadScript>
                            </Row>
                            <Row className="content-wrapper content">
                                <h3>Content</h3>
                                <Row>
                                    {mappedContent}
                                </Row>
                            </Row>
                        </Col>
                    </Row>
                    <Col className="content-wrapper mt-0">
                        <CommentsByEntityId
                        entityId={props.content.id}
                        currentUser={props.currentUser}
                        eTypeId={eTypeId}
                        />
                    </Col>
                </Col>
            </Container >
        </ThemeProvider>
    );
};

let content = PropTypes.shape({
        // Prop Types for Content...
}).isRequired;

let otherContent = PropTypes.shape({
        // Prop Types for Content...
}).isRequired;

Content.propTypes = {
    content: PropTypes.shape({
        // Prop Types for Content...
    )}
};

export default Content;
