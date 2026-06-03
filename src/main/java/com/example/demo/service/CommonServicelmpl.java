package com.example.demo.service;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Service
public class CommonServicelmpl implements CommonService{

    @Override
    public void removeSessionMessage() {
        HttpServletRequest request =  ((ServletRequestAttributes)(RequestContextHolder.getRequestAttributes())).getRequest();
        HttpSession session = request.getSession();
        session.removeAttribute("success");
        session.removeAttribute("error");
    }
}
