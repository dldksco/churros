package com.a503.churros.config.security;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CustomOncePerRequestFilter {
//extends OncePerRequestFilter
//    @Autowired
//    private CustomTokenProviderService customTokenProviderService;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
////        String jwt = getJwtFromRequest(request);
//        boolean aaa = false;
//        if(!aaa){
//            throw new IOException();
//        }else{
//            filterChain.doFilter(request, response);
//        }

//        if (StringUtils.hasText(jwt) ) {
//            customTokenProviderService.validateToken(jwt);
//
//            try{
//                UsernamePasswordAuthenticationToken authentication = customTokenProviderService.getAuthenticationById(jwt);
//                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                SecurityContextHolder.getContext().setAuthentication(authentication);
//            }catch(ExpiredJwtException e){
//                setErrorResponse(response, ErrorCode.TOKEN_EXPIRED);
//                return;
//            }
//
//        }


//    }



//    private void setErrorResponse(
//            HttpServletResponse response,
//            ErrorCode errorCode
//    ){
//        ObjectMapper objectMapper = new ObjectMapper();
//        response.setStatus(errorCode.getStatus());
//        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
//        ErrorResponse errorResponse = new ErrorResponse(errorCode.getStatus(), errorCode.getMessage());
//        try{
//            response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
//        }catch (IOException e){
//            e.printStackTrace();
//        }
//    }
//
//    @Data
//    public static class ErrorResponse{
//        private final Integer code;
//        private final String message;
//    }
//
//    private String getJwtFromRequest(HttpServletRequest request) {
//        String bearerToken = request.getHeader("Authorization");
//        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
//            log.info("bearerToken = {}", bearerToken.substring(7, bearerToken.length()));
//            return bearerToken.substring(7, bearerToken.length());
//        }
//        return null;
//    }
    
}
