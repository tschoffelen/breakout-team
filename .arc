@app
breakout-team

@cdn
@static

@http
post /api/breakouts
get /api/breakouts/:slug

@aws
region eu-west-1

@tables
breakouts
  slug *String
presence
  room *String

@macros
cors
