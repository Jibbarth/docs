webpackJsonp([76038511087769],{438:function(t,e){t.exports={pathContext:{editPath:"core/dto.md",current:{path:"docs/core/dto",title:"The API Component - Handling Data Transfer Objects (DTOs)"},prev:{path:"docs/core/graphql",title:"GraphQL Support",rootPath:"The API Component",items:[{path:"core/overall-view",title:"Overall View",rootPath:"GraphQL Support",items:[]},{path:"core/enabling-graphql",title:"Enabling GraphQL",rootPath:"GraphQL Support",items:[]},{path:"core/graphiql",title:"GraphiQL",rootPath:"GraphQL Support",items:[]},{path:"core/filters",title:"Filters",rootPath:"GraphQL Support",items:[{path:"core/filters/filtering-on-nested-properties-1",title:"Filtering on Nested Properties",rootPath:"Filters",items:[]}]},{path:"core/security-access_control",title:"Security (access_control)",rootPath:"GraphQL Support",items:[]},{path:"core/serialization-groups",title:"Serialization Groups",rootPath:"GraphQL Support",items:[]}]},next:{path:"docs/core/file-upload",title:"Handling File Upload",rootPath:"The API Component",items:[{path:"core/installing-vichuploaderbundle",title:"Installing VichUploaderBundle",rootPath:"Handling File Upload",items:[]},{path:"core/configuring-the-entity-receiving-the-uploaded-file",title:"Configuring the Entity Receiving the Uploaded File",rootPath:"Handling File Upload",items:[]},{path:"core/handling-file-upload",title:"Handling File Upload",rootPath:"Handling File Upload",items:[]},{path:"core/making-a-request-to-the-media_objects-endpoint",title:"Making a Request to the /media_objects Endpoint",rootPath:"Handling File Upload",items:[]},{path:"core/linking-a-mediaobject-resource-to-another-resource",title:"Linking a MediaObject Resource to Another Resource",rootPath:"Handling File Upload",items:[]}]},html:'<h1 id="handling-data-transfer-objects-dtos"><a href="#handling-data-transfer-objects-dtos" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Handling Data Transfer Objects (DTOs)</h1>\n<h2 id="how-to-use-a-dto-for-writing"><a href="#how-to-use-a-dto-for-writing" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>How to use a DTO for Writing</h2>\n<p>Sometimes it\'s easier to use a DTO than an Entity when performing simple\noperation. For example, the application should be able to send an email when\nsomeone has lost its password.</p>\n<p>So let\'s create a basic DTO for this request:</p>\n<div class="gatsby-highlight">\n      <pre class="language-php"><code class="language-php"><span class="token comment">// api/src/Api/Dto/ForgotPasswordRequest.php</span>\n\n<span class="token keyword">namespace</span> <span class="token package">App<span class="token punctuation">\\</span>Api<span class="token punctuation">\\</span>Dto</span><span class="token punctuation">;</span>\n\n<span class="token keyword">use</span> <span class="token package">ApiPlatform<span class="token punctuation">\\</span>Core<span class="token punctuation">\\</span>Annotation<span class="token punctuation">\\</span>ApiResource</span><span class="token punctuation">;</span>\n<span class="token keyword">use</span> <span class="token package">Symfony<span class="token punctuation">\\</span>Component<span class="token punctuation">\\</span>Validator<span class="token punctuation">\\</span>Constraints</span> <span class="token keyword">as</span> Assert<span class="token punctuation">;</span>\n\n<span class="token comment">/**\n * @ApiResource(\n *      collectionOperations={\n *          "post"={\n *              "path"="/users/forgot-password-request",\n *          },\n *      },\n *      itemOperations={},\n * )\n */</span>\n<span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">ForgotPasswordRequest</span>\n<span class="token punctuation">{</span>\n    <span class="token comment">/**\n     * @Assert\\NotBlank\n     * @Assert\\Email\n     */</span>\n    <span class="token keyword">public</span> <span class="token variable">$email</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>In this case, we disable all operations except <code class="language-text">POST</code>.</p>\n<p>Then, thanks to <a href="/docs/core/events">the event system</a>, it\'s possible to intercept the\n<code class="language-text">POST</code> request and to handle it.</p>\n<p>First, we should define a custom loader paths and create an event subscriber:</p>\n<ul>\n<li>define a custom loader paths for <code class="language-text">Api/Dto</code>:</li>\n</ul>\n<div class="gatsby-highlight">\n      <pre class="language-yaml"><code class="language-yaml"><span class="token key atrule">api_platform</span><span class="token punctuation">:</span>\n    <span class="token key atrule">mapping</span><span class="token punctuation">:</span>\n        <span class="token key atrule">paths</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'%kernel.project_dir%/src/Api/Dto\'</span><span class="token punctuation">]</span></code></pre>\n      </div>\n<ul>\n<li>create an event subscriber:</li>\n</ul>\n<div class="gatsby-highlight">\n      <pre class="language-php"><code class="language-php"><span class="token delimiter important">&lt;?php</span>\n<span class="token comment">// api/src/Api/EventSubscriber/UserSubscriber.php</span>\n\n<span class="token keyword">namespace</span> <span class="token package">App<span class="token punctuation">\\</span>Api<span class="token punctuation">\\</span>EventSubscriber</span><span class="token punctuation">;</span>\n\n<span class="token keyword">use</span> <span class="token package">ApiPlatform<span class="token punctuation">\\</span>Core<span class="token punctuation">\\</span>EventListener<span class="token punctuation">\\</span>EventPriorities</span><span class="token punctuation">;</span>\n<span class="token keyword">use</span> <span class="token package">App<span class="token punctuation">\\</span>Entity<span class="token punctuation">\\</span>User</span><span class="token punctuation">;</span>\n<span class="token keyword">use</span> <span class="token package">App<span class="token punctuation">\\</span>Manager<span class="token punctuation">\\</span>UserManager</span><span class="token punctuation">;</span>\n<span class="token keyword">use</span> <span class="token package">Symfony<span class="token punctuation">\\</span>Component<span class="token punctuation">\\</span>EventDispatcher<span class="token punctuation">\\</span>EventSubscriberInterface</span><span class="token punctuation">;</span>\n<span class="token keyword">use</span> <span class="token package">Symfony<span class="token punctuation">\\</span>Component<span class="token punctuation">\\</span>HttpFoundation<span class="token punctuation">\\</span>JsonResponse</span><span class="token punctuation">;</span>\n<span class="token keyword">use</span> <span class="token package">Symfony<span class="token punctuation">\\</span>Component<span class="token punctuation">\\</span>HttpKernel<span class="token punctuation">\\</span>Event<span class="token punctuation">\\</span>GetResponseForControllerResultEvent</span><span class="token punctuation">;</span>\n<span class="token keyword">use</span> <span class="token package">Symfony<span class="token punctuation">\\</span>Component<span class="token punctuation">\\</span>HttpKernel<span class="token punctuation">\\</span>KernelEvents</span><span class="token punctuation">;</span>\n\n<span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">UserSubscriber</span> <span class="token keyword">implements</span> <span class="token class-name">EventSubscriberInterface</span>\n<span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token variable">$userManager</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function">__construct</span><span class="token punctuation">(</span>UserManager <span class="token variable">$userManager</span><span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        <span class="token variable">$this</span><span class="token operator">-</span><span class="token operator">></span><span class="token property">userManager</span> <span class="token operator">=</span> <span class="token variable">$userManager</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">function</span> <span class="token function">getSubscribedEvents</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token punctuation">[</span>\n            KernelEvents<span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token constant">VIEW</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">[</span><span class="token single-quoted-string string">\'sendPasswordReset\'</span><span class="token punctuation">,</span> EventPriorities<span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token constant">POST_VALIDATE</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token punctuation">]</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function">sendPasswordReset</span><span class="token punctuation">(</span>GetResponseForControllerResultEvent <span class="token variable">$event</span><span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        <span class="token variable">$request</span> <span class="token operator">=</span> <span class="token variable">$event</span><span class="token operator">-</span><span class="token operator">></span><span class="token function">getRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token single-quoted-string string">\'api_forgot_password_requests_post_collection\'</span> <span class="token operator">!==</span> <span class="token variable">$request</span><span class="token operator">-</span><span class="token operator">></span><span class="token property">attributes</span><span class="token operator">-</span><span class="token operator">></span><span class="token function">get</span><span class="token punctuation">(</span><span class="token single-quoted-string string">\'_route\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token variable">$forgotPasswordRequest</span> <span class="token operator">=</span> <span class="token variable">$event</span><span class="token operator">-</span><span class="token operator">></span><span class="token function">getControllerResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token variable">$user</span> <span class="token operator">=</span> <span class="token variable">$this</span><span class="token operator">-</span><span class="token operator">></span><span class="token property">userManager</span><span class="token operator">-</span><span class="token operator">></span><span class="token function">findOneByEmail</span><span class="token punctuation">(</span><span class="token variable">$forgotPasswordRequest</span><span class="token operator">-</span><span class="token operator">></span><span class="token property">email</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token comment">// We do nothing if the user does not exist in the database</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$user</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token variable">$this</span><span class="token operator">-</span><span class="token operator">></span><span class="token property">userManager</span><span class="token operator">-</span><span class="token operator">></span><span class="token function">requestPasswordReset</span><span class="token punctuation">(</span><span class="token variable">$user</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token variable">$event</span><span class="token operator">-</span><span class="token operator">></span><span class="token function">setResponse</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">JsonResponse</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token number">204</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Then this class should be registered as a service, then tagged.</p>\n<p>If service autowiring and autoconfiguration are enabled (it\'s the case by\ndefault), you are done!</p>\n<p>Otherwise, the following configuration is needed:</p>\n<div class="gatsby-highlight">\n      <pre class="language-yaml"><code class="language-yaml"><span class="token comment"># api/config/services.yaml</span>\n<span class="token key atrule">services</span><span class="token punctuation">:</span>\n    <span class="token comment"># ...</span>\n    <span class="token key atrule">\'App\\Api\\EventSubscriber\\UserSubscriber\'</span><span class="token punctuation">:</span>\n        <span class="token key atrule">arguments</span><span class="token punctuation">:</span>\n            <span class="token punctuation">-</span> <span class="token string">\'@app.manager.user\'</span>\n        <span class="token comment"># Uncomment the following line only if you don\'t use autoconfiguration</span>\n        <span class="token comment">#tags: [ \'kernel.event_subscriber\' ]</span></code></pre>\n      </div>',nav:[{title:"The Distribution: Create Powerful APIs with Ease",path:"distribution",items:[{id:"index",title:"Getting Started with API Platform: Hypermedia and GraphQL API, Admin and Progressive Web App",anchors:[{id:"installing-the-framework",title:"Installing the Framework",anchors:[{id:"using-the-official-distribution-recommended",title:"Using the Official Distribution (recommended)"},{id:"using-symfony-flex-and-composer-advanced-users",title:"Using Symfony Flex and Composer (advanced users)"}]},{id:"its-ready",title:"It's Ready!"},{id:"bringing-your-own-model",title:"Bringing your Own Model"},{id:"validating-data",title:"Validating Data"},{id:"adding-graphql-support",title:"Adding GraphQL Support"},{id:"the-admin",title:"The Admin"},{id:"a-reactredux-progressive-web-app",title:"A React/Redux Progressive Web App"},{id:"other-features",title:"Other Features"}]},{id:"testing",title:"Testing and Specifying the API",anchors:[{id:"running-unit-tests-with-phpunit",title:"Running Unit Tests with PHPUnit"}]}]},{title:"The API Component",path:"core",items:[{id:"index",title:"The API Platform Core Library",anchors:[{id:"features",title:"Features"},{id:"other-resources",title:"Other resources"}]},{id:"getting-started",title:"Getting started",anchors:[{id:"installing-api-platform-core",title:"Installing API Platform Core"},{id:"before-reading-this-documentation",title:"Before Reading this Documentation"},{id:"mapping-the-entities",title:"Mapping the Entities"}]},{id:"design",title:"General Design Considerations"},{id:"configuration",title:"Configuration"},{id:"operations",title:"Operations",anchors:[{id:"enabling-and-disabling-operations",title:"Enabling and Disabling Operations"},{id:"configuring-operations",title:"Configuring Operations",anchors:[{id:"prefixing-all-routes-of-all-operations",title:"Prefixing All Routes of All Operations"}]},{id:"subresources",title:"Subresources",anchors:[{id:"control-the-path-of-subresources",title:"Control the Path of Subresources"},{id:"control-the-depth-of-subresources",title:"Control the Depth of Subresources"}]},{id:"creating-custom-operations-and-controllers",title:"Creating Custom Operations and Controllers",anchors:[{id:"recommended-method",title:"Recommended Method"},{id:"alternative-method",title:"Alternative Method"}]}]},{id:"default-order",title:"Overriding Default Order"},{id:"filters",title:"Filters",anchors:[{id:"doctrine-orm-filters",title:"Doctrine ORM Filters",anchors:[{id:"basic-knowledge",title:"Basic Knowledge"},{id:"search-filter",title:"Search Filter"},{id:"date-filter",title:"Date Filter",anchors:[{id:"managing-null-values",title:"Managing null Values"}]},{id:"boolean-filter",title:"Boolean Filter"},{id:"numeric-filter",title:"Numeric Filter"},{id:"range-filter",title:"Range Filter"},{id:"exists-filter",title:"Exists Filter"},{id:"order-filter-sorting",title:"Order Filter (Sorting)",anchors:[{id:"comparing-with-null-values",title:"Comparing with Null Values"},{id:"using-a-custom-order-query-parameter-name",title:"Using a Custom Order Query Parameter Name"}]},{id:"filtering-on-nested-properties",title:"Filtering on Nested Properties"},{id:"enabling-a-filter-for-all-properties-of-a-resource",title:"Enabling a Filter for All Properties of a Resource"}]},{id:"serializer-filters",title:"Serializer Filters",anchors:[{id:"group-filter",title:"Group Filter"},{id:"property-filter",title:"Property filter"}]},{id:"creating-custom-filters",title:"Creating Custom Filters",anchors:[{id:"creating-custom-doctrine-orm-filters",title:"Creating Custom Doctrine ORM Filters"},{id:"using-doctrine-filters",title:"Using Doctrine Filters"},{id:"overriding-extraction-of-properties-from-the-request",title:"Overriding Extraction of Properties from the Request"}]},{id:"apifilter-annotation",title:"ApiFilter Annotation"}]},{id:"serialization",title:"The Serialization Process",anchors:[{id:"overall-process",title:"Overall Process"},{id:"available-serializers",title:"Available Serializers"},{id:"the-serialization-context-groups-and-relations",title:"The Serialization Context, Groups and Relations",anchors:[{id:"configuration",title:"Configuration"}]},{id:"using-serialization-groups",title:"Using Serialization Groups"},{id:"using-serialization-groups-per-operation",title:"Using Serialization Groups per Operation",anchors:[{id:"embedding-relations",title:"Embedding Relations"},{id:"denormalization",title:"Denormalization"}]},{id:"changing-the-serialization-context-dynamically",title:"Changing the Serialization Context Dynamically"},{id:"changing-the-serialization-context-on-a-per-item-basis",title:"Changing the Serialization Context on a Per-item Basis"},{id:"name-conversion",title:"Name Conversion"},{id:"decorating-a-serializer-and-adding-extra-data",title:"Decorating a Serializer and Adding Extra Data"},{id:"entity-identifier-case",title:"Entity Identifier Case"},{id:"embedding-the-json-ld-context",title:"Embedding the JSON-LD Context"}]},{id:"validation",title:"Validation",anchors:[{id:"validating-submitted-data",title:"Validating Submitted Data"},{id:"using-validation-groups",title:"Using Validation Groups"},{id:"using-validation-groups-on-operations",title:"Using Validation Groups on Operations"},{id:"dynamic-validation-groups",title:"Dynamic Validation Groups"},{id:"error-levels-and-payload-serialization",title:"Error Levels and Payload Serialization"}]},{id:"errors",title:"Errors Handling",anchors:[{id:"converting-php-exceptions-to-http-errors",title:"Converting PHP Exceptions to HTTP Errors"}]},{id:"pagination",title:"Pagination",anchors:[{id:"disabling-the-pagination",title:"Disabling the Pagination",anchors:[{id:"globally",title:"Globally"},{id:"for-a-specific-resource",title:"For a Specific Resource"},{id:"client-side",title:"Client-side",anchors:[{id:"globally-1",title:"Globally"},{id:"for-a-specific-resource-1",title:"For a specific resource"}]}]},{id:"changing-the-number-of-items-per-page",title:"Changing the Number of Items per Page",anchors:[{id:"globally-2",title:"Globally"},{id:"for-a-specific-resource-2",title:"For a Specific Resource"},{id:"client-side-1",title:"Client-side",anchors:[{id:"globally-3",title:"Globally"},{id:"for-a-specific-resource-3",title:"For a Specific Resource"}]}]},{id:"changing-maximum-items-per-page",title:"Changing Maximum items per page",anchors:[{id:"globally-4",title:"Globally"},{id:"for-a-specific-resource-4",title:"For a Specific Resource"},{id:"for-a-specific-resource-collection-operation",title:"For a Specific Resource Collection Operation"}]},{id:"partial-pagination",title:"Partial Pagination",anchors:[{id:"globally-5",title:"Globally"},{id:"for-a-specific-resource-5",title:"For a Specific Resource"},{id:"client-side-2",title:"Client-side",anchors:[{id:"globally-6",title:"Globally"},{id:"for-a-specific-resource-6",title:"For a Specific Resource"}]}]},{id:"avoiding-double-sql-requests-on-doctrine",title:"Avoiding double SQL requests on Doctrine"}]},{id:"events",title:"The Event System"},{id:"content-negotiation",title:"Content Negotiation",anchors:[{id:"enabling-several-formats",title:"Enabling Several Formats"},{id:"enabling-additional-formats-on-a-specific-resourceoperation",title:"Enabling Additional Formats On a Specific Resource/Operation"},{id:"registering-a-custom-serializer",title:"Registering a Custom Serializer"},{id:"writing-a-custom-normalizer",title:"Writing a Custom Normalizer"}]},{id:"external-vocabularies",title:"Using External Vocabularies"},{id:"extending-jsonld-context",title:"Extending JSON-LD context"},{id:"data-providers",title:"Data Providers",anchors:[{id:"custom-collection-data-provider",title:"Custom Collection Data Provider"},{id:"custom-item-data-provider",title:"Custom Item Data Provider"},{id:"injecting-the-serializer-in-an-itemdataprovider",title:"Injecting the Serializer in an ItemDataProvider"},{id:"injecting-extensions-pagination-filter-eagerloading-etc",title:"Injecting Extensions (Pagination, Filter, EagerLoading etc.)"}]},{id:"data-persisters",title:"Data Persisters",anchors:[{id:"creating-a-custom-data-persister",title:"Creating a Custom Data Persister"}]},{id:"identifiers",title:"Identifiers",anchors:[{id:"custom-identifier-normalizer",title:"Custom identifier normalizer"},{id:"supported-identifiers",title:"Supported identifiers"}]},{id:"extensions",title:"Extensions",anchors:[{id:"custom-extension",title:"Custom Extension"},{id:"example",title:"Example",anchors:[{id:"blocking-anonymous-users",title:"Blocking Anonymous Users"}]}]},{id:"security",title:"Security",anchors:[{id:"configuring-the-access-control-message",title:"Configuring the Access Control Message"}]},{id:"performance",title:"Performance",anchors:[{id:"enabling-the-built-in-http-cache-invalidation-system",title:"Enabling the Built-in HTTP Cache Invalidation System",anchors:[{id:"extending-cache-tags-for-invalidation",title:"Extending Cache-Tags for invalidation"}]},{id:"enabling-the-metadata-cache",title:"Enabling the Metadata Cache"},{id:"using-ppm-php-pm",title:"Using PPM (PHP-PM)"},{id:"doctrine-queries-and-indexes",title:"Doctrine Queries and Indexes",anchors:[{id:"search-filter-1",title:"Search Filter"},{id:"eager-loading",title:"Eager Loading",anchors:[{id:"max-joins",title:"Max Joins"},{id:"force-eager",title:"Force Eager"},{id:"override-at-resource-and-operation-level",title:"Override at Resource and Operation Level"},{id:"disable-eager-loading",title:"Disable Eager Loading"}]},{id:"partial-pagination-1",title:"Partial Pagination"}]}]},{id:"operation-path-naming",title:"Operation Path Naming",anchors:[{id:"configuration-1",title:"Configuration"},{id:"create-a-custom-operation-path-resolver",title:"Create a Custom Operation Path Resolver",anchors:[{id:"defining-the-operation-path-resolver",title:"Defining the Operation Path Resolver"},{id:"registering-the-service",title:"Registering the Service"},{id:"configure-it",title:"Configure It"}]}]},{id:"form-data",title:"Accept application/x-www-form-urlencoded Form Data",anchors:[{id:"create-your-deserializelistener-decorator",title:"Create your DeserializeListener Decorator"},{id:"creating-the-service-definition",title:"Creating the Service Definition"}]},{id:"fosuser-bundle",title:"FOSUserBundle Integration",anchors:[{id:"installing-the-bundle",title:"Installing the Bundle"},{id:"enabling-the-bridge",title:"Enabling the Bridge"},{id:"creating-a-user-entity-with-serialization-groups",title:"Creating a User Entity with Serialization Groups"}]},{id:"jwt",title:"JWT Authentication",anchors:[{id:"installing-lexikjwtauthenticationbundle",title:"Installing LexikJWTAuthenticationBundle"},{id:"documenting-the-authentication-mechanism-with-swaggeropen-api",title:"Documenting the Authentication Mechanism with Swagger/Open API",anchors:[{id:"configuring-api-platform",title:"Configuring API Platform"},{id:"adding-a-new-api-key",title:"Adding a New API Key"}]},{id:"testing-with-behat",title:"Testing with Behat"}]},{id:"nelmio-api-doc",title:"NelmioApiDocBundle Integration"},{id:"angularjs-integration",title:"AngularJS Integration",anchors:[{id:"restangular",title:"Restangular"},{id:"ng-admin",title:"ng-admin"}]},{id:"swagger",title:"Swagger / Open API Support",anchors:[{id:"overriding-the-swagger-documentation",title:"Overriding the Swagger Documentation"},{id:"using-the-swagger-context",title:"Using the Swagger Context"},{id:"changing-the-name-of-a-definition",title:"Changing the Name of a Definition"},{id:"changing-operations-in-the-swagger-documentation",title:"Changing Operations in the Swagger Documentation"},{id:"changing-the-swagger-ui-location",title:"Changing the Swagger UI Location",anchors:[{id:"disabling-swagger-ui",title:"Disabling Swagger UI"},{id:"manually-registering-the-swagger-ui-controller",title:"Manually Registering the Swagger UI Controller"}]},{id:"using-the-swagger-command",title:"Using the Swagger Command"},{id:"overriding-the-ui-template",title:"Overriding the UI Template",anchors:[{id:"enable-swagger-doc-for-api-gateway",title:"Enable Swagger doc for API Gateway"}]}]},{id:"graphql",title:"GraphQL Support",anchors:[{id:"overall-view",title:"Overall View"},{id:"enabling-graphql",title:"Enabling GraphQL"},{id:"graphiql",title:"GraphiQL"},{id:"filters",title:"Filters",anchors:[{id:"filtering-on-nested-properties-1",title:"Filtering on Nested Properties"}]},{id:"security-access_control",title:"Security (access_control)"},{id:"serialization-groups",title:"Serialization Groups"}]},{id:"dto",title:"Handling Data Transfer Objects (DTOs)",anchors:[{id:"how-to-use-a-dto-for-writing",title:"How to use a DTO for Writing"}]},{id:"file-upload",title:"Handling File Upload",anchors:[{id:"installing-vichuploaderbundle",title:"Installing VichUploaderBundle"},{id:"configuring-the-entity-receiving-the-uploaded-file",title:"Configuring the Entity Receiving the Uploaded File"},{id:"handling-file-upload",title:"Handling File Upload"},{id:"making-a-request-to-the-media_objects-endpoint",title:"Making a Request to the /media_objects Endpoint"},{id:"linking-a-mediaobject-resource-to-another-resource",title:"Linking a MediaObject Resource to Another Resource"}]}]},{title:"The Schema Generator Component",path:"schema-generator",items:[{id:"index",title:"The schema generator",anchors:[{id:"what-is-schemaorg",title:"What is Schema.org?"},{id:"why-use-schemaorg-data-to-generate-a-php-model",title:"Why use Schema.org data to generate a PHP model?",anchors:[{id:"dont-reinvent-the-wheel",title:"Don't Reinvent The Wheel"},{id:"improve-seo-and-user-experience",title:"Improve SEO and user experience"},{id:"be-ready-for-the-future",title:"Be ready for the future"}]},{id:"documentation",title:"Documentation"}]},{id:"getting-started",title:"Getting Started",anchors:[{id:"installation",title:"Installation"},{id:"model-scaffolding",title:"Model Scaffolding",anchors:[{id:"going-further",title:"Going Further"}]},{id:"cardinality-extraction",title:"Cardinality Extraction"}]},{id:"configuration",title:"Configuration",anchors:[{id:"customizing-php-namespaces",title:"Customizing PHP Namespaces"},{id:"forcing-a-field-range",title:"Forcing a Field Range"},{id:"forcing-a-field-cardinality",title:"Forcing a Field Cardinality"},{id:"forcing-a-relation-table-name",title:"Forcing a Relation Table Name"},{id:"forcing-or-disabling-a-class-parent",title:"Forcing (or Disabling) a Class Parent"},{id:"forcing-a-class-to-be-abstract",title:"Forcing a Class to be Abstract"},{id:"forcing-a-nullable-property",title:"Forcing a Nullable Property"},{id:"forcing-a-unique-property",title:"Forcing a Unique Property"},{id:"making-a-property-read-only",title:"Making a Property Read Only"},{id:"making-a-property-write-only",title:"Making a Property Write Only"},{id:"forcing-a-property-to-be-in-a-serialization-group",title:"Forcing a Property to be in a Serialization Group"},{id:"forcing-an-embeddable-class-to-be-embedded",title:"Forcing an Embeddable Class to be Embedded"},{id:"author-phpdoc",title:"Author PHPDoc"},{id:"disabling-generators-and-creating-custom-ones",title:"Disabling Generators and Creating Custom Ones"},{id:"skipping-accessor-method-generation",title:"Skipping Accessor Method Generation"},{id:"disabling-the-id-generator",title:"Disabling the id Generator"},{id:"generating-uuids",title:"Generating UUIDs"},{id:"user-submitted-uuids",title:"User submitted UUIDs"},{id:"generating-custom-ids",title:"Generating Custom IDs"},{id:"disabling-usage-of-doctrine-collection",title:"Disabling Usage of Doctrine Collection"},{id:"changing-the-field-visibility",title:"Changing the Field Visibility"},{id:"generating-asserttype-annotations",title:"Generating @Assert\\Type Annotations"},{id:"forcing-doctrine-inheritance-mapping-annotation",title:"Forcing Doctrine Inheritance Mapping Annotation"},{id:"interfaces-and-doctrine-resolve-target-entity-listener",title:"Interfaces and Doctrine Resolve Target Entity Listener"},{id:"custom-schemas",title:"Custom Schemas"},{id:"checking-goodrelation-compatibility",title:"Checking GoodRelation Compatibility"},{id:"php-file-header",title:"PHP File Header"},{id:"full-configuration-reference",
title:"Full Configuration Reference"}]}]},{title:"The Admin Component",path:"admin",items:[{id:"index",title:"The API Platform Admin",anchors:[{id:"features-1",title:"Features"}]},{id:"getting-started",title:"Getting Started",anchors:[{id:"installation-1",title:"Installation"},{id:"creating-the-admin",title:"Creating the Admin"},{id:"customizing-the-admin",title:"Customizing the Admin",anchors:[{id:"using-custom-components",title:"Using Custom Components"},{id:"managing-files-and-images",title:"Managing Files and Images"},{id:"using-a-custom-validation-function-or-inject-custom-props",title:"Using a Custom Validation Function or Inject Custom Props"}]}]},{id:"authentication-support",title:"Authentication Support"},{id:"handling-relations-to-collections",title:"Handling Relations to Collections",anchors:[{id:"customizing-a-property",title:"Customizing a Property"},{id:"using-an-autocomplete-input-for-relations",title:"Using an Autocomplete Input for Relations"}]}]},{title:"The Client Generator Component",path:"client-generator",items:[{id:"index",title:"The API Platform Client Generator",anchors:[{id:"features-2",title:"Features"}]},{id:"react",title:"React generator"},{id:"vuejs",title:"Vue.js generator"},{id:"troubleshooting",title:"Troubleshooting"}]},{title:"Deployment",path:"deployment",items:[{id:"index",title:"Deploying API Platform Applications"},{id:"kubernetes",title:"Deploying to a Kubernetes Cluster",anchors:[{id:"preparing-your-cluster-and-your-local-machine",title:"Preparing Your Cluster and Your Local Machine"},{id:"creating-and-publishing-the-docker-images",title:"Creating and Publishing the Docker Images"},{id:"deploying",title:"Deploying"},{id:"initializing-the-database",title:"Initializing the Database"},{id:"tiller-rbac-issue",title:"Tiller RBAC Issue"}]},{id:"heroku",title:"Deploying an API Platform App on Heroku"}]},{title:"Extra",path:"extra",items:[{id:"releases",title:"The Release Process"},{id:"philosophy",title:"API Platform's Philosophy"},{id:"troubleshooting",title:"Troubleshooting",anchors:[{id:"using-docker",title:"Using Docker",anchors:[{id:"with-docker-toolbox-on-windows",title:"With Docker Toolbox on Windows"},{id:"error-starting-userland-proxy",title:"Error starting userland proxy"}]},{id:"using-api-platform-and-jms-serializer-in-the-same-project",title:"Using API Platform and JMS Serializer in the same project"}]},{id:"contribution-guides",title:"Contribution guides"},{id:"conduct",title:"Contributor Code of Conduct"}]}]}}}});
//# sourceMappingURL=path---docs-core-dto-325fd23606cec04bdc1d.js.map