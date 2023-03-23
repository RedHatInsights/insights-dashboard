import './trialsPage.scss';

import PropTypes from 'prop-types';
import { AccordionContent, AccordionItem, AccordionToggle } from '@patternfly/react-core';
import React, { useState } from 'react';

const FrequentlyAskedQuestionsRows = ({ faq, answer }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <AccordionItem>
            <AccordionToggle
                onClick={() => setIsExpanded(!isExpanded)}
                isExpanded={isExpanded}
            >
                {faq}
            </AccordionToggle>
            <AccordionContent isHidden={!isExpanded}>
                {answer}
            </AccordionContent>
        </AccordionItem>
    );
};

FrequentlyAskedQuestionsRows.propTypes = {
    faq: PropTypes.string,
    answer: PropTypes.array
};

export default FrequentlyAskedQuestionsRows;
