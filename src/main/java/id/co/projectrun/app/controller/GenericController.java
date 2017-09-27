package id.co.projectrun.app.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.MessageSource;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.ui.Model;
import org.springframework.web.context.ServletContextAware;
import org.springframework.web.context.support.WebApplicationContextUtils;

//import id.co.projectrun.app.service.AuditLogService;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Locale;

/**
 * Created by daniel on 4/10/15.
 */
public class GenericController implements ServletContextAware {
    protected final Log log = LogFactory.getLog(getClass());
    
    private MessageSourceAccessor messages;
    private ServletContext servletContext;
    @Autowired
    protected Locale language;
    @Autowired
    protected Locale timezone;

//	@Autowired
//	protected AuditLogService auditLogService;
    
    @Autowired
    public void setMessages(MessageSource messageSource) {
        messages = new MessageSourceAccessor(messageSource);
    }

    protected String getMessage(String msgKey) {
        return getMessage(msgKey, null);
    }

    protected String getMessage(String msgKey, Object ... args) {
        return getMessage(language, msgKey, args);
    }

    protected String getMessage(Locale locale, String msgKey, Object ... args) {
        return messages.getMessage(msgKey, args, locale);
    }

    @Override
    public void setServletContext(ServletContext servletContext) {
        this.servletContext = servletContext;
    }

    protected ServletContext getServletContext() {
        return servletContext;
    }

    protected String getPageContent(String content) {
        return content;
    }

    protected boolean isAjaxRequest(HttpServletRequest request) {
        try {
            return request.getHeader("X-Requested-With").equalsIgnoreCase("XMLHttpRequest");
        } catch (NullPointerException e) {
            return false;
        }
    }

    protected void setResponseAsJson(HttpServletResponse response) {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
    }
    
    protected void setResponseAsPicture(HttpServletResponse response) {
        response.setContentType("image/jpeg");
    }

    protected void setResponseAsCsv(HttpServletResponse response) {
        response.setContentType("text/csv");
    }
    
    protected void setResponseAsZip(HttpServletResponse response) {
        response.setContentType("application/zip");
    }
    
	public void onAuthenticationSuccess(Model model,
			HttpServletRequest request, HttpServletResponse response,
			Authentication auth) throws IOException, ServletException {
		// TODO Auto-generated method stub
		System.out.println("yyy");
	}
	
	public ApplicationContext getApplicationContext()
	{
		return WebApplicationContextUtils.getRequiredWebApplicationContext(getServletContext());
	}
}
