
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


DROP DATABASE IF EXISTS `itarticles`;
CREATE DATABASE IF NOT EXISTS `itarticles` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `itarticles`;



DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `authers` varchar(100) NOT NULL,
  `abstract` varchar(9000) NOT NULL,
  `link` varchar(200)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `authentication`;
CREATE TABLE `authentication` (
  `auth_id` varchar(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE TABLE `articles`;

TRUNCATE TABLE `authentication`;

INSERT INTO authentication (`auth_id`) VALUES ('haytham2001');

INSERT INTO authentication (`auth_id`) VALUES ('zedan2001');

INSERT INTO authentication (`auth_id`) VALUES ('ahmad2001');

INSERT INTO authentication (`auth_id`) VALUES ('zyde2001');

INSERT INTO authentication (`auth_id`) VALUES ('sami2001');

ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

INSERT INTO articles (`title`,`authers`,`abstract`,`link`) VALUES ('The role of information technology in the organization: a review, model, and assessment','Todd Dewett,Gareth R Jones','This paper reviews and extends recent scholarly and popular literature to provide a broad overview of how information technology (IT) impacts organizational characteristics and outcomes. First, based on a review of the literature, we describe two of the principal performance enhancing benefits of IT: information efficiencies and information synergies, and identify five main organizational outcomes of the application of IT that embody these benefits. We then discuss the role that IT plays in moderating the relationship between organizational characteristics including structure, size, learning, culture, and interorganizational relationships and the most strategic outcomes, organizational efficiency and innovation. Throughout we discuss the limitations and possible negative consequences of the use of IT and close by considering several key areas for future research.','https://www.academia.edu/download/6386591/10.1.1.112.8685.pdf');

INSERT INTO articles (`title`,`authers`,`abstract`,`link`) VALUES ('Information Technology and Corporate Strategy: A Research Perspective','J. Yannis Bakos,Michael E. Treacy','The use of information technology (IT) as a competitive weapon has become a popular cliche; but there is still a marked lack of understanding of the issues that determine the influence of information technology on a particular organization and the processes that will allow a smooth coordination of technology and corporate strategy. This article surveys the major efforts to arrive at a relevent framework, and attempts to integrate them in a more comprehensive viewpoint. The focus then turns to the major research issues in understanding the impact of information technology on competitive strategy.','https://dspace.mit.edu/bitstream/handle/1721.1/48183/informationtechn00bako.pdf;sequence=1');

INSERT INTO articles (`title`,`authers`,`abstract`) VALUES ('Information Technology Evaluation: Is It Different?','Philip Powell','All investment decisions are problematic. The IT community seems to shy away from evaluation of its investments. This paper examines information technology investment in order to assess if it is radically different from other investment decisions. The lack of formal evaluation of IT projects may be due, not to a deficiency in the tools available to the evaluator, but to other factors. These factors are appraised and possible ways forward considered.');

INSERT INTO articles (`title`,`authers`,`abstract`,`link`) VALUES ('Innovating Mindfully with Information Technology','E. Burton Swanson,Neil C. Ramiller','Although organizational innovation with information technology is often carefully considered, bandwagon phenomena indicate that much innovative behavior may nevertheless be of the "me too" variety. In this essay, we explore such differences in innovative behavior. Adopting a perspective that is both institutional and cognitive, we introduce the notion of mindful innovation with IT. A mindful firm attends to an IT innovation with reasoning grounded in its own organizational facts and specifics. We contrast this with mindless innovation, where a firms actions betray an absence of such attention and grounding. We develop these concepts by drawing on the recent appearance of the idea of mindfulness in the organizational literature, and adapting it for application to IT innovation. We then bring mindfulness and mindlessness together in a larger theoretical synthesis in which these apparent opposites are seen to interact in ways that help to shape the overall landscape of opportunity for organizational innovation with IT. We conclude by suggesting several promising new research directions.','http://www.sietmanagement.fr/wp-content/uploads/2017/12/Swanson-Ramiler.pdf');

INSERT INTO articles (`title`,`authers`,`abstract`) VALUES ('Information technology and mindfulness in organizations','Mikko Valorinta','The concept of mindfulness has lately been applied to organizations that are increasingly attentive to their environment and adaptive to unanticipated events. This article analyzes how information technology impacts mindfulness in organizations. Information technology is proposed to promote mindfulness by engaging organizations in more extensive search processes and by fuelling organizational innovations with a repertoire of routines. However, information technology is also found to decrease mindfulness and impede organizational adoption by promoting cognitive inertia and making the enactment of change more challenging. The article also identifies the practices IT-intensive organizations apply to promote more mindful behavior.');