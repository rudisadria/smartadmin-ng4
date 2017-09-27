package id.co.projectrun.app.controller;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.web.servlet.ErrorPage;
import org.springframework.context.MessageSource;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by daniel on 4/7/15.
 */
@Controller
//@RequestMapping(ErrorHandlerController.ERROR_PATH)
public class ErrorHandlerController implements ErrorController, EmbeddedServletContainerCustomizer {
    protected final Log log = LogFactory.getLog(getClass());

    public static final String ERROR_PATH = "/error/";

    private MessageSourceAccessor messages;

    @Autowired
    public void setMessages(MessageSource messageSource) {
        messages = new MessageSourceAccessor(messageSource);
    }

    @Override
    public void customize(ConfigurableEmbeddedServletContainer configurableEmbeddedServletContainer) {
        configurableEmbeddedServletContainer.addErrorPages(new ErrorPage(HttpStatus.FORBIDDEN, "/forbidden"));
        configurableEmbeddedServletContainer.addErrorPages(new ErrorPage(HttpStatus.NOT_FOUND, "/not-found"));
        configurableEmbeddedServletContainer.addErrorPages(new ErrorPage(HttpStatus.INTERNAL_SERVER_ERROR, "/internal-server"));
    }

    @Override
    public String getErrorPath() {
        return ERROR_PATH;
    }

    @RequestMapping("/error")
    public String generalError(final Model model, final HttpServletRequest request) {
    	log.error("Request invalid URL: " + request.getAttribute("javax.servlet.forward.request_uri"));

        model.addAttribute("url", request.getRequestURL());

        return "error/general";
    }

    @RequestMapping("/forbidden")   
    public String forbidden(final Model model, final HttpServletRequest request) {
    	log.error("Request invalid URL: " + request.getAttribute("javax.servlet.forward.request_uri"));

        model.addAttribute("url", request.getRequestURL());

        return "error/403";
    }

    @RequestMapping("/not-found")
    public String notFound(final Model model, final HttpServletRequest request) {
    	log.error("Request invalid URL: " + request.getAttribute("javax.servlet.forward.request_uri"));
        model.addAttribute("url", request.getRequestURL());

        return "error/404";
    }

    @RequestMapping("/internal-server")
    public String internalServerError(final Model model, final HttpServletRequest request) {
    	log.error("Request invalid URL: " + request.getAttribute("javax.servlet.forward.request_uri"));

        model.addAttribute("url", request.getRequestURL());

        return "error/500";
    }
}