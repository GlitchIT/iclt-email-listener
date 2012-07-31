<?php



$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
	case 'POST':
		rest_post();
		break;
	case 'GET':
		rest_get();
		break;
}

function rest_get() {
	//redirect to home
	header( 'Location: http://'.$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF']) ) ;
}

function rest_post() {
	require_once("inc/twig.php");
	require_once("inc/data.php");
	
	require_once("inc/Swift/swift_required.php");
	
	$twigVars["root"] = rtrim("http://".$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF']), '/') . DIRECTORY_SEPARATOR;
	
	$twigVars["post"] = $_POST;
	
	
	$body = $twig->render("email.twig", $twigVars);
	$fieldTechEmail = $_POST['fieldTech'].'@dbb.org.au';
	// Create the message
	$message = Swift_Message::newInstance()
	
	// Give the message a subject
	->setSubject('##ICLT Automatic Ticket Generation##')
	
	// Set the From address with an associative array
	->setFrom($fieldTechEmail)
	
	//CC self
	->setCc($fieldTechEmail)
	
	// Set the To addresses with an associative array
	->setTo('porl42@gmail.com')
	
	// Give it a body
	->setBody($body, 'text/plaintext')

	;
	
	
	
	echo $twig->render("submit.html.twig", $twigVars);
}