package id.co.projectrun.app.configuration;

import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

//import id.co.projectrun.app.authhandler.AuthenticationFailureHandler;
//import id.co.projectrun.app.authhandler.AuthenticationSuccessHandler;
//import id.co.projectrun.app.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

/**
 * Created by daniel on 3/30/15.
 */
@Configuration
@EnableWebMvcSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {
	
//	@Autowired
//	private UserDetailsService userService;
//
//	@Autowired
//	private AuthenticationSuccessHandler authenticationSuccessHandler;
//	
//	@Autowired
//	private AuthenticationFailureHandler authenticationFailureHandler;
//	
//	@Autowired
//	private SessionRegistry sessionRegistry;

//    @Override
//    public void configure( final WebSecurity web ) throws Exception {
//        web.ignoring()
//                .antMatchers("/", "/index.html", WebGuiConstant.CAPTCHA_PATH_SECURITY_MAPPING, "/css/**", "/fonts/**",
//						"/sass/**", "/js/**","/assets/**","/**/*.js","/**/*.css","/app/pages/login/login.html");
//    }
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
//		http.csrf().disable().authorizeRequests().antMatchers("/**").permitAll();
		
		http.csrf().disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		
//		http
//			.csrf().disable()
//			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//			.and()
//			.authorizeRequests()
//			.antMatchers("/", "/index.html", WebGuiConstant.CAPTCHA_PATH_SECURITY_MAPPING, "/css/**", "/fonts/**",
//					"/img/**", "/js/**", "/apk/**", "/error**", "/error/**", "/webservice/**","/assets/**","/app-js/**","/app-css/**","/js2/**")				
//					.permitAll()
//			.antMatchers("/login**","/webservice/**")
//				.anonymous()
//			.antMatchers("/home/**","/app/**")
//				.fullyAuthenticated()
//			.anyRequest().fullyAuthenticated();
		
//		http
//			.authorizeRequests()
//				.antMatchers("/", "/index.html", WebGuiConstant.CAPTCHA_PATH_SECURITY_MAPPING, "/css/**", "/fonts/**",
//						"/img/**", "/js/**", "/apk/**", "/error**", "/error/**", "/webservice/**","/assets/**","/app-js/**","/app-css/**","/js2/**")				
//						.permitAll()
//				.antMatchers("/login**","/webservice/**")
//					.anonymous()
//				.antMatchers("/home/**","/app/**")
//					.fullyAuthenticated()
//				.anyRequest().fullyAuthenticated()
//			.and()
//			.formLogin().loginPage("/")
//				.successHandler(authenticationSuccessHandler).failureHandler(authenticationFailureHandler)
//				.permitAll().and().logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
//				.logoutSuccessUrl("/index.html").invalidateHttpSession(true).permitAll()
//			.and()
//			.csrf().requireCsrfProtectionMatcher(new RequestMatcher() {
//				private final Pattern allowedMethods = Pattern.compile("^(GET|HEAD|TRACE|OPTIONS)$");
//	
//					@Override
//					public boolean matches(HttpServletRequest req) {
//						if (allowedMethods.matcher(req.getMethod()).matches())
//							return false;
//						if (req.getServletPath().startsWith("/webservice/") || req.getPathInfo().startsWith("/webservice/"))
//							return false;
//						return true;
//					}
//			})
//			.and()
//			.headers()
//				.disable()
//			.sessionManagement()
//			    .maximumSessions(1) // How many session the same user can have? This can be any number you pick
//			    .expiredUrl("/login?error=expired")
//			    .sessionRegistry(sessionRegistry)
//			    .and().invalidSessionUrl("/login?error=expired");
	}

//	@Bean(name = "passwordEncoder")
//	public PasswordEncoder getPasswordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
//	
//	@Override
//	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//		auth.userDetailsService(userService).passwordEncoder(getPasswordEncoder());
//	}
//	
//	@Bean
//	public SessionRegistry sessionRegistry() {
//		return new SessionRegistryImpl();
//	}
}